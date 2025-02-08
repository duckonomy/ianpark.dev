---
title: "From Java Spring to Go: Testing"
description: "When JUnit Met Table Tests fun things happen"
publishDate: "14 January 2023"
language: "en"
tags: ["software"]
---

When I first started writing tests in Go after years of Spring Boot, I felt like I'd been doing it wrong all along. Not because Spring's testing was bad - but because Go's approach to testing felt refreshingly straightforward.

## The Spring Boot Testing Ceremony

In Spring, testing often feels like preparing for a formal dinner. You need the right annotations, the correct context configuration, and don't forget your mocking framework:

```java
@SpringBootTest
class CoffeeServiceTest {
    @MockBean
    private CoffeeRepository repository;

    @Autowired
    private CoffeeService service;

    @Test
    void shouldBrewStrongCoffee() {
        // The test itself is almost lost in all the setup
        when(repository.findById(1L))
            .thenReturn(Optional.of(new Coffee("Espresso", 5)));

        Coffee coffee = service.brewCoffee(1L);
        assertEquals(5, coffee.getStrength());
    }
}
```

## Enter Table-Driven Tests

Go's table-driven tests are like discovering that you can test multiple scenarios in one elegant structure. Think of it as your test cases sitting at a well-organized spreadsheet rather than scattered across multiple methods:

```go
func TestBrewCoffee(t *testing.T) {
    tests := []struct {
        name    string
        id      int64
        mock    *Coffee
        want    *Coffee
        wantErr error
    }{
        {
            name: "successfully brew strong coffee",
            id:   1,
            mock: &Coffee{ID: 1, Name: "Espresso", Strength: 5},
            want: &Coffee{ID: 1, Name: "Espresso", Strength: 5},
        },
        // More test cases...
    }
```

The beauty isn't just in the structure - it's in how easy it becomes to add new test cases. Found a bug? Add another test case. New edge case? Just another line in your test table.

## Mocking: Simpler Than You Think

Remember Mockito? The framework that lets you write mocks that look like English sentences? Go takes a different approach - interfaces are your mocking framework:

```go
type CoffeeRepository interface {
    GetCoffee(id int64) (*Coffee, error)
    SaveCoffee(*Coffee) error
}

// Your mock is just a struct implementing the interface
type mockRepo struct {
    coffee *Coffee
    err    error
}

func (m *mockRepo) GetCoffee(id int64) (*Coffee, error) {
    if m.err != nil {
        return nil, m.err
    }
    return m.coffee, nil
}
```

No reflection magic, no proxy objects, just plain old interfaces. It's like going from a fancy automated coffee machine back to a French press - simpler, more reliable, and you understand exactly what's happening.

## Integration Tests: When You Need the Real Thing

Sometimes unit tests aren't enough. You need to test against a real database. In Spring, this often means complex test configurations and hoping your test database is in the right state.

Go with testcontainers makes this remarkably clean:

```go
func TestCoffeeRepository_Integration(t *testing.T) {
    ctx := context.Background()

    // Spin up a fresh Postgres instance for each test
    postgres, err := postgres.RunContainer(ctx,
        testcontainers.WithImage("postgres:14"),
        postgres.WithDatabase("coffee_test"),
    )
    require.NoError(t, err)
    defer postgres.Terminate(ctx)

    // Your actual test code...
}
```

## The Subtle Art of Test Organization

One of the most refreshing aspects of Go testing is how it encourages you to structure your tests. Instead of relying on test inheritance or shared fixtures, you're encouraged to keep tests focused and self-contained.

For example, testing different scenarios for the same function:

```go
func TestCoffeeService(t *testing.T) {
    t.Run("brewing", func(t *testing.T) {
        t.Run("successful brew", func(t *testing.T) {
            // Test happy path
        })
        t.Run("insufficient beans", func(t *testing.T) {
            // Test error case
        })
    })
}
```

## Testing HTTP Handlers

Testing HTTP handlers in Go is particularly elegant compared to Spring's MockMvc:

```go
func TestCoffeeHandler_GetCoffee(t *testing.T) {
    handler := NewCoffeeHandler(mockRepo{})

    req := httptest.NewRequest("GET", "/coffee/1", nil)
    w := httptest.NewRecorder()

    handler.ServeHTTP(w, req)

    resp := w.Result()
    assert.Equal(t, http.StatusOK, resp.StatusCode)
}
```

No need for special test contexts or mock MVCs - just plain HTTP requests and responses.

## The Real Benefits

After months of writing tests in both styles, here's what I've learned:

1. **Clarity**: Table-driven tests make it impossible to hide test cases. They're all right there, clearly documented.
2. **Maintainability**: Adding new test cases is trivial - just add another entry to your test table.
3. **Readability**: Tests are just Go code. No special annotations or contexts to understand.
4. **Speed**: Go tests are blazingly fast, partly because they don't need to boot up a spring context.

Perhaps most importantly, Go's testing approach encourages you to write testable code in the first place. When mocking is this simple, you naturally write code that's easy to test.

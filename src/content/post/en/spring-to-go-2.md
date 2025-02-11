---
title: "From Java Spring to Go: HTTP Servers"
description: "How I Learned to Stop Worrying and Love the HandlerFunc"
publishDate: "22 December 2022"
language: "en"
tags: ["software"]
---

Remember when you first discovered Spring's `@RestController` and thought, "Wow, this annotation is magic!"? Well, prepare yourself for Go's take on HTTP handling, where the magic show turns into a delightfully straightforward rock concert.

# The Tale of Two Servers

In Spring Boot land, we're used to our controllers looking like a Christmas tree of annotations:

```java
@RestController
@RequestMapping("/api/coffee")
public class CoffeeController {
    @Autowired
    private CoffeeService coffeeService;

    @GetMapping("/{id}")
    public ResponseEntity<Coffee> getCoffee(@PathVariable Long id) {
        return ResponseEntity.ok(coffeeService.getCoffee(id));
    }

    @PostMapping
    @Valid
    public ResponseEntity<Coffee> brewCoffee(@RequestBody CoffeeRequest request) {
        // Spring does its validation dance
        return ResponseEntity.status(201)
                           .body(coffeeService.brewCoffee(request));
    }
}
```

Now, let's see how Go handles this with Chi (my personal favorite after trying to juggle multiple routers like a caffeinated circus performer):

```go
type CoffeeHandler struct {
    service *CoffeeService
    // No annotations were harmed in the making of this handler
}

func NewCoffeeHandler(service *CoffeeService) *CoffeeHandler {
    return &CoffeeHandler{service: service}
}

func (h *CoffeeHandler) Routes() chi.Router {
    r := chi.NewRouter()

    r.Get("/{id}", h.GetCoffee)
    r.Post("/", h.BrewCoffee)
    // Look Ma, readable routing!

    return r
}

func (h *CoffeeHandler) GetCoffee(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")

    coffee, err := h.service.GetCoffee(id)
    if err != nil {
        // No more ResponseEntity.status().body()...
        http.Error(w, "Coffee not found, try tea instead", http.StatusNotFound)
        return
    }

    // Good ol' JSON encoding
    json.NewEncoder(w).Encode(coffee)
}
```

# Middleware: The Great Expectations

Spring Security's annotations are like having an overprotective parent:

```java
@PreAuthorize("hasRole('BARISTA')")
@PostMapping("/special-blend")
public ResponseEntity<Coffee> makeSpecialBlend() {
    // Only certified baristas allowed!
}
```

Go's middleware is more like having a bouncer who's also a professional engineer:

```go
func AdminOnly(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        user := r.Context().Value(UserKey)
        if user == nil || !user.(User).IsAdmin {
            http.Error(w, "Nice try, but only admins can make special blend",
                      http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}

// In your router
r.With(AdminOnly).Post("/special-blend", h.MakeSpecialBlend)
```

# The Context Conundrum

Spring's request scope is like a magical bag that somehow holds everything you need. Go's Context is more like a well-organized toolbelt - everything is there, but you have to clip it on yourself:

```go
type key string

const UserKey key = "user"

func (h *CoffeeHandler) BrewCoffee(w http.ResponseWriter, r *http.Request) {
    user := r.Context().Value(UserKey).(User)
    // If this panics, you probably forgot to attach your toolbelt (middleware)

    var req BrewRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "I can't read your coffee order, try semaphore",
                  http.StatusBadRequest)
        return
    }

    coffee, err := h.service.Brew(req, user)
    if err != nil {
        // Look at all these explicit error cases!
        switch {
        case errors.Is(err, ErrOutOfBeans):
            http.Error(w, "We need more beans!", http.StatusServiceUnavailable)
        case errors.Is(err, ErrTooMuchCaffeine):
            http.Error(w, "Maybe switch to decaf?", http.StatusBadRequest)
        default:
            http.Error(w, "The coffee gods are angry", http.StatusInternalServerError)
        }
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(coffee)
}
```

# The Real Talk™

After building HTTP servers in both Spring and Go, here's what I've learned:

1. Spring's annotations are like having autocorrect - great until they "correct" something into gibberish
2. Go's explicit error handling makes you face your API's failure cases head-on
3. Middleware composition in Go is like building with Lego - simple pieces that fit together perfectly
4. The lack of magic means junior developers can actually understand what's happening

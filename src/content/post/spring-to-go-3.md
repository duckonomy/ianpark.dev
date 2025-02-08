---
title: "From Java Spring to Go: SQL"
description: "From JPA Magic to SQL Reality"
publishDate: "09 January 2023"
language: "en"
tags: ["software"]
---

After exploring Go's simplicity, let's dive into everyone's favorite topic: database access. Pour yourself a strong cup of coffee - you'll need it as we explore the journey from JPA's comfortable abstractions to Go's "here's your SQL, deal with it" approach.

## The Comfort Zone: JPA's Magic Kingdom

In Spring, we treat databases like magical object stores. Need to save something? Just sprinkle some annotations!

```java
@Entity
@Table(name = "coffees")
public class Coffee {
    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private Roaster roaster;

    // Imagine more JPA annotations here...
}
```

Life was good. Until that one fateful day when you had to debug a production issue involving lazy loading in a disconnected session. Those horror stories still keep junior developers awake at night.

Want to query something? Just write a method name that looks like English had a coffee with SQL:

```java
@Repository
public interface CoffeeRepository extends JpaRepository<Coffee, Long> {
    // The famous "method name longer than your git commit messages"
    List<Coffee> findByRoasterAndStrengthGreaterThan(
        Roaster roaster,
        int strength
    );
}
```

## Welcome to Go: The SQL Renaissance

Moving to Go feels like your database just sat you down for an intervention: "Listen, we need to talk about those magical abstractions you've been using..."

Let's start with our basic structure:

```go
type Coffee struct {
    ID        int64     `db:"id"`
    Name      string    `db:"name"`
    RoasterID int64     `db:"roaster_id"`
    Strength  int       `db:"strength"`
}

type CoffeeRepository struct {
    db *sql.DB
    // That's it. No magic. No sessionFactory. Just a connection.
}
```

Want to find some coffee? Better brush up on your SQL:

```go
func (r *CoffeeRepository) FindStrongCoffees(ctx context.Context, roasterID int64, minStrength int) ([]Coffee, error) {
    query := `
        SELECT id, name, roaster_id, strength
        FROM coffees
        WHERE roaster_id = $1 AND strength > $2`

    // ... scanning logic here ...
}
```

## The Transaction Tango

Remember `@Transactional`? That magical annotation that would sometimes work exactly as expected and sometimes leave you questioning your career choices? Well, Go has a different approach.

Instead of:

```java
@Transactional
public void transferBeans(Long fromId, Long toId, int amount) {
    // Magic happens here
}
```

You write:

```go
func (r *CoffeeRepository) TransferBeans(ctx context.Context, fromID, toID int64, amount int) error {
    tx, err := r.db.BeginTx(ctx, nil)
    if err != nil {
        return fmt.Errorf("beginning transaction: %w", err)
    }
    defer tx.Rollback() // Safety first!

    // Explicit transaction steps...
    return tx.Commit()
}
```

## The Reality Check

After months of working with both approaches, here's what I've learned:

1. **SQL is Actually Your Friend**: Those SQL queries you've been avoiding? They're like that neighbor you thought was grumpy but actually makes amazing cookies once you get to know them.

2. **Explicit is Better Than Magic**: Yes, writing out transactions is more work. But when something goes wrong, you know exactly where to look - unlike that time you spent three days debugging a `@Transactional(propagation = REQUIRES_NEW)` issue.

3. **Performance is Predictable**: No more surprise lazy loading queries in your logs. No more unexpected N+1 problems appearing in production at 3 AM.

4. **Error Handling is a Feature**: Go's explicit error handling forces you to think about what can go wrong. And in database operations, Murphy's Law is more reliable than any ORM.

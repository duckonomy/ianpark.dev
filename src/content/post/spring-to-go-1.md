---
title: "From Java Spring to Go: Magic vs Explicit"
description: "From Spring's magical DI wonderland"
publishDate: "01 December 2022"
language: "en"
tags: ["software"]
---

After spending years in Spring's dependency injection wonderland (and consuming enough coffee to keep Colombian farmers in business), my journey into Go felt like trading a magical but temperamental wand for a reliable power drill. You know, the kind that actually does what you expect instead of surprising you with "`@Autowired` butterflies" during your 3 AM production incidents.

# The Magic Show vs. Reality Check

In Spring Boot, we've all written code that feels like performing at a magic show where sometimes even the magician doesn't know what's in the hat:

```java
@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    @Value("${app.user.default-role}")
    private String defaultRole;

    @Cacheable("users")
    public Optional<User> findUser(String id) {
        // Spring does its magic!
        // Transactions? Handled!
        // Caching? Done!
        // Logging? Got it!
        // NPE in production? ...Surprise!
        return userRepository.findById(id);
    }
}
```

Meanwhile, Go looks at your Spring annotations and responds with the programming equivalent of "Sir, this is a Wendy's":

```go
type UserService struct {
    repo      Repository
    cache     Cache
    logger    Logger
    defaultRole string
    // Look Ma, I can see all my dependencies!
}

func NewUserService(repo Repository, cache Cache, logger Logger, config Config) *UserService {
    return &UserService{
        repo:       repo,
        cache:      cache,
        logger:     logger,
        defaultRole: config.DefaultRole,
        // Everything is explicit, like that code review comment
        // you've been avoiding for a week
    }
}
```

# The Dependency Injection Rehab Program

Remember how Spring magically injects your dependencies? It's like having a well-meaning but overly enthusiastic assistant who sometimes brings you a DataSource when you asked for a sandwich. Sure, both are resources, but one is significantly less edible.

Go's approach is more like having a straightforward colleague:

```go
// Go: "Here's your dependency, and yes, you need to handle errors"
func (s *UserService) FindUser(ctx context.Context, id string) (*User, error) {
    // First, check cache
    user, err := s.cache.Get(ctx, id)
    if err != nil && !errors.Is(err, cache.ErrNotFound) {
        return nil, fmt.Errorf("cache lookup failed: %w", err)
    }
    if user != nil {
        return user, nil
    }

    // Cache miss, hit the database
    user, err = s.repo.FindByID(ctx, id)
    if err != nil {
        return nil, fmt.Errorf("database lookup failed: %w", err)
    }

    // Update cache asynchronously
    go func() {
        if err := s.cache.Set(ctx, id, user); err != nil {
            s.logger.Error("failed to update cache", "error", err)
        }
    }()

    return user, nil
}
```

# Configuration: From Magical Properties to Explicit Reality

Spring's property injection is like ordering at a restaurant where the menu is written in invisible ink and the specials change based on the phase of the moon. Your application works perfectly in dev, staging, and QA, only to crash in production because apparently `${crucial.config}` was actually supposed to be `${CRUCIAL_CONFIG}`.

Go's configuration is more like reading a cookbook:

```go
type Config struct {
    Database struct {
        Host     string `env:"DB_HOST" default:"localhost"`
        Port     int    `env:"DB_PORT" default:"5432"`
        Username string `env:"DB_USER" required:"true"`
        Password string `env:"DB_PASS" required:"true"`
    }
    Cache struct {
        TTL  time.Duration `env:"CACHE_TTL" default:"15m"`
        Size int          `env:"CACHE_SIZE" default:"1000"`
    }
    // If you forget something, the compiler becomes your
    // very own Gordon Ramsay
}
```

# The Unexpected Benefits

After months of Go development, I've discovered some surprising upsides:

1. **Faster Onboarding**: New team members can actually understand what's happening by reading the code, instead of having to learn the secret handshake of Spring annotations.

2. **Better Testing**: No more need for `@SpringBootTest` to test a simple service. Just create an instance with mock dependencies and go!

3. **Clear Failure Modes**: When something breaks, the error message actually tells you what went wrong instead of giving you a stack trace that looks like the entire works of Shakespeare.

4. **Predictable Performance**: No more mysterious slowdowns because some aspect decided to intercept every method call and phone home to Mars.

# The Verdict

The transition isn't always smooth. You'll miss your annotations. You'll write `if err != nil` so many times that your IDE's autocomplete will start suggesting it after you type "good morning". You might even catch yourself trying to annotate your Go structs with `@Repository` during a particularly sleep-deprived coding session.

But here's the thing: the time you used to spend debugging Spring's magic is now spent writing explicit error handling and dependency wiring. And while it might feel more verbose at first, you'll eventually realize that you're spending less time in debuggers and more time actually building features.

And hey, if you're really missing Spring's magic, you can always create a service called `MagicalDependencyInjector` and prepare for your code reviewer to send you a link to the nearest Go rehabilitation center.

# Conclusion

Go might not have the magical flair of Spring, but it offers something better: predictability. It's like trading your temperamental sports car for a reliable truck. Sure, it might not have as many features, but it'll get you where you need to go, and you'll actually understand why it sometimes makes that weird noise.

_Written by a developer who has typed `if err != nil` more times than they've checked their production logs this week. And yes, that's saying something._

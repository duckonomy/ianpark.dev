---
title: "From Java to Go: Error Handling"
description: "A Love Letter to Explicit Error Handling"
publishDate: "23 January 2023"
language: "en"
tags: ["software"]
---

Dear Java developers clutching their try-catch blocks,

Let's talk about Go's error handling - you know, that thing that made you go "eww, what's with all these `if err != nil` checks?" when you first saw Go code. I get it. I was once like you, comfortable in the warm embrace of Java's exception handling, but let me tell you a story about how I learned to stop worrying and love the explicit error.

## The Java Way: Throwing Caution to the Wind

In Java, we're used to code that looks something like this:

```java
try {
    doSomething();
    doSomethingElse();
    andYetAnotherThing();
} catch (SomeException e) {
    // Panic! At the Disco
    e.printStackTrace();
} catch (AnotherException e) {
    // More panic!
    logger.error("Oh no!", e);
} finally {
    // Clean up our mess
    cleanupStuff();
}
```

It's like playing hot potato with exceptions - throw them around until someone catches them or the program crashes. Sure, it looks clean(ish), but it's also a bit like those horror movies where the protagonist splits up from the group. You know something bad might happen, but you won't know where or when until it jumps out and scares you.

## The Go Way: Facing Our Fears

Now, let's look at Go's approach:

```go
err := doSomething()
if err != nil {
    return fmt.Errorf("failed to do something: %w", err)
}

err = doSomethingElse()
if err != nil {
    return fmt.Errorf("failed to do something else: %w", err)
}

err = andYetAnotherThing()
if err != nil {
    return fmt.Errorf("failed to do yet another thing: %w", err)
}

cleanup()
```

"But that's so verbose!" I hear you cry. Yes, it is! And that's exactly the point. It's like having your mom remind you to check if you've packed your lunch every single day - annoying but ultimately good for you.

## Why Go's Way Is (Actually) Better

1. **No Surprises**: In Go, errors are just values. They're not some magical control flow mechanism that can appear out of nowhere like your cat at 3 AM. You have to deal with them right there, right then.

2. **Clear Error Paths**: Every function call that can fail forces you to think about failure. It's like having a pessimistic friend who always asks "but what if it goes wrong?" - annoying but often right.

3. **Better Error Context**: Instead of getting a stack trace that looks like a CVS receipt, Go encourages you to wrap errors with context at each step. It's like leaving yourself breadcrumbs instead of throwing bread at birds and hoping they make a trail.

## The Real Beauty of Go's Error Handling

The beauty of Go's error handling isn't just in its explicitness - it's in how it changes the way you think about errors. They're not exceptional cases to be caught in a safety net somewhere up the call stack. They're regular values that need to be dealt with as part of your normal program flow.

```go
// Go's approach is like checking your pockets:
// Phone? Check.
// Keys? Check.
// Wallet? Check.
if err := doRiskyThing(); err != nil {
    // Deal with it right here, right now
}

// Java's approach is more like:
// Throw everything in your bag and hope nothing falls out!
try {
    doRiskyThing();
} catch (Exception e) {
    // Surprise! Your keys were missing all along
}
```

## The Horror Stories We Don't Talk About

Let me tell you about that one time in production... Actually, let me tell you about MANY times in production with Java exceptions:

```java
try {
    // 500 lines of business logic
} catch (Exception e) {
    logger.error("Something went wrong", e);
    // But what went wrong? Everything's caught in one place!
    // Time to play "guess the line number" in production!
}
```

We've all seen it. We've all done it (don't deny it). And we've all regretted it at 3 AM when something breaks and all we have is a stack trace longer than a university thesis.

Here are some classic Java exception horror stories:

1. **The Silent Catch**:

```java
try {
    criticalOperation();
} catch (Exception e) {
    // TODO: Handle this later
}
// Narrator: "Later" never came
```

2. **The Exception Blackhole**:

```java
try {
    // Dozens of operations
} catch (Exception e) {
    // Log and swallow
    logger.error(e);
    // Keep going like nothing happened!
    // What could possibly go wrong?
}
```

3. **The Nested Try-Catch Nightmare**:

```java
try {
    try {
        try {
            // Inception, but with exceptions
        } catch (SpecificException e) {
            try {
                // Recovery attempt #1
            } catch (AnotherException e2) {
                // We need to go deeper
            }
        }
    } catch (Exception e) {
        // What level of the dream are we in now?
    }
} catch (Throwable t) {
    // The ultimate safety net
    // Also known as "I give up"
}
```

## Why Go's Approach Leads to More Robust Code

Here's where Go's "verbose" error handling really shines in terms of robustness:

1. **Explicit Error Boundaries**: Every potential point of failure is visible right there in your code. It's like having warning signs before every potentially dangerous turn, instead of just having a general "Drive Carefully" sign at the start of the road.

```go
if err := stepOne(); err != nil {
    // We know EXACTLY which step failed
    return fmt.Errorf("step one failed: %w", err)
}

if err := stepTwo(); err != nil {
    // And which step succeeded before the failure
    return fmt.Errorf("step two failed: %w", err)
}
```

2. **No Hidden Control Flow**: In Java, an exception can bubble up through multiple layers of code, making it hard to reason about the program's flow. With Go, you can trace the error handling path by just reading the code line by line. It's like having a map with "You Are Here" markers everywhere instead of just hoping you'll end up at the right place.

3. **Forced Error Design**: Because Go makes you handle errors explicitly, you're forced to think about error cases during development, not just when things break in production. It's like building a ship in a bottle - you have to plan each step carefully because you can't just reach in and fix things later.

4. **Clear Recovery Points**: When something goes wrong in Go, you know exactly where it went wrong and what was successful before the failure. In Java, you might catch an exception from any of dozens of operations in a try block. It's like having a security camera on every corner versus just having one at the entrance.

```go
func robustOperation() error {
    // Step 1
    if err := prepare(); err != nil {
        return fmt.Errorf("preparation failed: %w", err)
    }
    // We know preparation succeeded if we're here

    // Step 2
    if err := execute(); err != nil {
        return fmt.Errorf("execution failed: %w", err)
    }
    // We know both preparation and execution succeeded

    return nil
}
```

## Conclusion

Is Go's error handling perfect? No. Is it verbose? Yes. But it's like eating your vegetables - sometimes the things that are good for you aren't the most exciting. Go's error handling makes you face your errors head-on, deal with them explicitly, and think about failure modes as a first-class concern.

And hey, if you're still not convinced, just remember: at least you're not writing C and checking return values against -1 all day long. Now _that_ would be something to throw an exception about!

If you're missing try-catch blocks, just remember: nostalgia isn't what it used to be. 😉

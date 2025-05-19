---
title: "A Functional Approach to Kotlin and Spring"
description: "Escaping try-catch"
publishDate: "15 May 2025"
language: "en"
draft: true
tags: ["software"]
---

With my recent mingling of modern programming languages (Rust, Go, OCaml, Haskell), I've been able to expose myself to the wonders of monadic error handling. And with my new job, I've been able to get my hands on a very modern version of Kotlin.

# Gripes
Because most of java-land (jvm ecosystem) is riddled with try-catch error handling, the modeled error is based on a `Throwable`. This is by all means limited to say the least. I mean, it does contain a bunch of stack traces and ways to show where it was happening. At furthest, it contains a `localizedMessage`.

# Our Design
We decided to model our logs and response types based on our custom Error Type. This error not only throws errors but contains the detailed information about the response type and log message type. Thus, we can abstract the logging process through this one error type.

# The `Result`
Well, due too our decision making, we had to have our own result type with basic combinators (`fold`, `bind`, etc) and a custom `runCatching` to handle our Result type. But now, instead of handling a pure `Throwable`, it handles custom error type on `failure`.

# Further exploration
Although a bit beyond our project's scope, there are libraries like Either.




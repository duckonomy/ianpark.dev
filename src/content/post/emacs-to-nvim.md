---
title: "Emacs to Neovim"
description: "My journey switching from Emacs to Neovim"
publishDate: "01 December 2024"
language: "en"
tags: ["tools"]
---

After twelve years of living in Emacs, making the switch to Neovim wasn't a decision I took lightly. When you've spent over a decade customizing and evolving your development environment, change comes with a heavy cost. I still believe Emacs represents a superior approach to human-computer interaction compared to traditional command-line interfaces. However, practical considerations finally tipped the scales.

# The Performance Reality

Let's talk about the elephant in the room: performance. I love Emacs like I love my first car - it got me where I needed to go, taught me a lot about how things work under the hood, but sometimes it would just... stop in the middle of the highway. While Emacs excels in its extensibility and integrated environment, its single-threaded nature has become my daily source of mild frustration.

Here's what finally pushed me over the edge: working on a medium-sized Rust project, I noticed consistent UI freezes during LSP operations. Even on my M1 MacBook Pro:

- LSP operations causing 500ms-1s freezes during heavy refactoring
- Noticeable stutters when running multiple LSP servers (Rust + TypeScript)
- Tree-sitter parsing occasionally blocking the UI

The same operations in Neovim are nearly instantaneous, with background processing handling the heavy lifting. The difference is particularly stark when you're rapidly switching between files or performing project-wide refactoring.

This isn't a new issue - the Emacs community has been discussing the limitations of single-threaded architecture for years. As detailed in [Andrea Corallo's deep dive into Emacs concurrency](https://akrl.sdf.org/gccemacs.html), adding true multithreading to Emacs would require fundamental changes to its core architecture.

I still remember the moment that broke me - it was 11 PM, I was deep in the flow state working on a complex feature, when Emacs decided to freeze for a good 15 seconds while processing some treesitter operations. In that moment, watching my cursor turn into the dreaded spinning wheel, I finally admitted to myself: maybe it's time for a change.

Neovim's architecture, built with modern workflows in mind, leverages multi-threading effectively. This isn't just about raw speed – it's about maintaining sanity while coding. When your LSP operations run in separate threads, you don't get those micro-freezes that make you question your life choices. The difference is particularly noticeable when working with larger codebases or when running multiple language servers simultaneously.

# Community Momentum Matters

What drew me to Neovim specifically (rather than traditional Vim) was its fresh start. Unlike Vim, Neovim began as a modern rewrite with a clear goal: strip away decades of accumulated cruft while maintaining the core editing philosophy. This clean-slate approach means its codebase is largely modern, making it easier to implement features like async operations and proper multithreading. When you're not carrying 30 years of backward compatibility, you can make better architectural decisions.

The momentum from this modern foundation is evident in projects like:

- [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) with its superior parsing performance and incremental updates
- [telescope.nvim](https://github.com/nvim-telescope/telescope.nvim) showing what's possible with async operations
- [lazy.nvim](https://github.com/folke/lazy.nvim) demonstrating modern plugin management with parallel loading
- [null-ls.nvim](https://github.com/jose-elias-alvarez/null-ls.nvim) bridging LSP with traditional tools

These aren't just plugins - they're examples of what's possible when modern architectural decisions meet an active community. The rapid development cycle and focus on performance have created an ecosystem that feels distinctly contemporary.

# Not a Victory for Unix Philosophy

Let me be clear: this transition isn't an endorsement of the Unix philosophy of "doing one thing well." I still believe that Emacs' approach of providing a comprehensive environment is fundamentally superior to chaining together collections of narrow tools. The integrated experience of Emacs – with its unified interface for email, project management, git operations, and more – remains unmatched.

However, we don't always get to choose our battles. Sometimes, practical considerations outweigh architectural elegance. While I miss the coherent, integrated environment of Emacs, the performance benefits and robust tool support in Neovim have become too significant to ignore.

# Aside on Lisp

My relationship with Lisp through Emacs is complicated – it's both a superpower and what you might call a "white elephant" (borrowing from the Korean expression "계륵" - something both valuable and burdensome). The power of Lisp macros and homoiconicity is undeniable. Being able to treat code as data and transform it programmatically opens up possibilities that most other languages can only dream of.

However, as I spend more time with strongly-typed languages like Rust in my professional work, I've come to appreciate different paradigms. The very flexibility that makes Lisp powerful can sometimes work against maintainability in larger codebases. It's a trade-off I've had to weigh carefully in my journey as a developer.

This dichotomy mirrors my broader transition from Emacs to Neovim – sometimes we have to balance our love for elegant, powerful systems with the practical demands of modern software development.

# The Real Cost of Transition

The switch to Neovim came with both technical and lifestyle adjustments, some more painful than others. The immediate challenges were mostly muscle memory:

- `C-x C-s` to save became a series of random characters in normal mode
- I kept trying to `C-g` out of situations instead of mashing `ESC`
- Modal editing required a complete mental shift - simple things like copying multiple regions became a multi-step dance

Then came the terminal multiplexing decision. Moving from Emacs's built-in window management to a terminal environment meant choosing between several less-than-ideal options. While I had previous experience with tmux, I was hesitant to add another layer of terminal emulation and potential rendering overhead. After some research, I landed on Kitty for its native multiplexing support. Tools like tmux and Zellij are powerful, but when you're already dealing with a terminal emulator and Neovim, adding another layer of terminal abstraction felt unnecessary. Kitty's approach of handling multiplexing at the terminal emulator level just made more sense.

But the deeper impacts came from losing Emacs's integrated environment. `magit` was a particularly hard goodbye - `fugitive` is capable but lacks that seamless integration that made version control feel natural. `dired` was another casualty; even with `nvim-tree`, file management feels more primitive. (edit 01/01/2025: I found `oil.nvim` \o/)

The most significant loss, however, has been org-mode. This wasn't just about losing a feature - it was about dismantling an entire life organization system. I've found myself in the uncomfortable position of fragmenting my workflow across multiple "native" apps:

- Task management split across todo apps that can't quite replicate org-agenda's flexibility
- Note-taking scattered between Obsidian, Notion, and various Markdown editors
- Time tracking, project planning, and writing all requiring separate tools - each with their own subscription plans

The irony is striking - I switched to Neovim for better coding performance, but now I spend more time researching productivity apps than I ever spent tweaking my org-mode setup. Instead of writing code to fix my workflow issues, I'm comparing subscription plans and feature matrices of proprietary apps.

What I miss most isn't just the features, but the freedom. With Emacs, everything felt like it was just a few lines of Elisp away from being exactly how I wanted it. Now I'm at the mercy of product teams and their roadmaps, submitting feature requests instead of writing pull requests. Some issues were psychological rather than technical - in Emacs, the solution to any problem was within reach. In Neovim, I find myself having to adapt to its way of thinking more often than bending the editor to my will.

This migration doesn't feel like an upgrade – it feels like a pragmatic compromise. Yes, Neovim is blazingly fast and has excellent modern features, but it still operates within the constraints of terminal-based interfaces, which feel increasingly antiquated compared to Emacs' potential for richer interaction models.

# Looking forward

I maintain hope that the Emacs community will eventually address these performance limitations, perhaps through native compilation improvements or fundamental architectural changes. Until then, I'm making peace with trading some of Emacs' elegant integration for Neovim's raw performance and broader tool support.

For those considering a similar switch, remember that this isn't about choosing sides in the editor wars. It's about acknowledging that different tools have different strengths, and sometimes the practical choice isn't the ideologically pure one. Emacs taught me to expect more from my development environment, and that lesson remains valuable even as I adapt to a new toolset.

The future of development environments might not lie in either Emacs or Vim, but understanding both paradigms – Emacs' integrated environment and Neovim's performance-focused approach – provides valuable perspective on what developers really need from their tools.

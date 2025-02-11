---
title: "Cli Tool for Managing Projects"
description: "The Swiss Army Knife for Project Context and Workflows"
publishDate: "18 December 2024"
language: "en"
draft: true
tags: ["tools"]
---

Ever found yourself juggling multiple projects across different languages and frameworks? Switching between them feels like a context-switching nightmare, with each ecosystem demanding its own set of commands and environmental setup. Today, I'm excited to introduce `parkour`, a lightweight CLI tool that brings seamless project management to your fingertips.

# The Problem

As developers, we face common challenges:

- Navigating between projects scattered across our filesystem
- Managing different build systems and commands across languages
- Maintaining project-specific environments and configurations
- Running repetitive workflows that vary by project type

While tools like `direnv` handle environment management and IDEs offer comprehensive solutions, there's been a gap for developers seeking a lightweight, CLI-first approach that ties everything together.

# Enter Parkour

`parkour` is designed with a single focus: streamlining project discovery and interaction. It serves as the glue between your projects and their workflows, offering a unified interface while staying true to the Unix philosophy.

# Core Features

## Smart Project Detection

```bash
pk switch my-project  # Fuzzy matches and switches to project directory
pk list              # Shows all indexed projects
```

## Unified Workflow Commands

```bash
pk build   # Automatically detects project type and runs appropriate build command
pk test    # Runs tests using the project's native test runner
pk deploy  # Executes deployment workflow defined in .sp-config
```

## Environment Integration

`pk` automatically loads project-specific environments and provides hooks for setup/teardown, working seamlessly with existing tools like `direnv`.

## Cross-Project Management

```bash
pk search "api"    # Finds all projects containing "api"
pk build --all     # Builds all indexed projects
```

# Lightweight by Design

`pk` doesn't try to replace your IDE or existing tools. Instead, it focuses on being the missing link between them. Configuration is minimal and flexible through the config file:

```toml
# $HOME/.config/parkour/config.toml
[[projects]]
path = "/path/to/project1"
type = "go"
name = "MyGoProject"
priority = 1
dirty = false
build_command = ["go", "build", "./..."]
run_command = ["./myapp"]
test_command = ["go", "test", "./..."]
```

# What's Next

The roadmap includes:

- Extended ecosystem support
- Project templates and scaffolding
- Remote project management
- Enhanced multi-project workflows

`sp` brings order to the chaos of project management without the bloat. It's the tool I wish I had when managing multiple projects across different languages and frameworks.

Try it out and let me know what you think! Contributions are welcome on [GitHub](https://github.com/duckonomy/parkour).

---
title: Cajá CLI
description: The command-line interface and tools for the Cajá language.
icon: /caja-logo48x48.svg
repo: https://github.com/caja-tech/caja-cli
draft: false
---

A command-line interface for the Caja language. The `caja` CLI allows you to execute `.caja` scripts, as well as encode and decode them into transportable token strings.

## Installation

You can install the Caja CLI globally using npm:

```bash
npm install -g @caja/cli
```

## Usage & Commands

### 1. Run a Script
Parse and evaluate a `.caja` script file to execute it.

```bash
caja run -f <file.caja>
```
- `-f, --file`: The path to the `.caja` script file.
- `-e, --export` (Optional): File name to export log values to (e.g., `data.csv`).

### 2. Encode a Script
Encode a `.caja` script file and its dependencies into a single base64-like token string.

```bash
caja -f <file.caja>
```

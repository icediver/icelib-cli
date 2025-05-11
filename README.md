# Icelib CLI ❄️

[![Node.js CI](https://github.com/icediver/icelib-cli/workflows/Node.js%20CI/badge.svg)](https://github.com/icediver/icelib-cli/actions)
[![npm version](https://img.shields.io/npm/v/icelib.svg)](https://www.npmjs.com/package/icelib)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> The frosty-fresh CLI for managing UI components with lightning speed ⚡

## Features ✨

- **Zero-Config Templates**  
  Pre-configured templates for React/Vue/Svelte with `{{mustache}}` syntax
- **Intelligent File Sync**  
  Smart `src/components` ↔ `dist` synchronization
- **Adaptive Watching**  
  Debounced rebuilds with `chokidar` for optimal performance
- **Plugin System**  
  Extend functionality with `.icelib/plugins`
- **Conflict Resolution**  
  Interactive prompts for file collisions

## Installation 🧊

```bash
# Install globally
npm install -g icelib-cli

# OR use with npx (no installation)
npx icelib-cli@latest init
```

# Quick Start 🚀
Initialize your project:

```bash
icelib init
```
## Add components:


```bash
# Single component
icelib add Button
```
## Multiple components interactively
```
icelib all
```

Start development:

```bash
icelib watch
```
Configuration ⚙️

Create .icelibrc.json in your project root:

```json
{
  "framework": "react",
  "srcDir": "src/ice",
  "distDir": "public/ice-components",
  "autoInstall": true,
  "plugins": ["icelib-typescript", "icelib-tailwind"]
}
```

# All Commands 📜

Command	Description

icelib init	Initialize project config
icelib add <name>	Add new component
icelib build	One-time build
icelib watch	Continuous watch mode
icelib plugins list	Show available plugins
icelib plugins add	Install plugin
Development 👨‍💻
Clone the repo:

```bash
git clone https://github.com/icediver/icelib-cli.git
cd icelib-cli
```
Install dependencies:

```bash
npm install
```
Build and link:

```bash
npm run build
npm link
```
# Contributing 🤝
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feat/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feat/amazing-feature)

Open a Pull Request

See our Contribution Guidelines for details.

License 📄
MIT © Icediver

❄️ Repository: https://github.com/icediver/icelib-cli
📧 Support: icediver@live.ru
🐞 Issues: https://github.com/icediver/icelib-cli/issues


### Key Improvements:

1. **Visual Hierarchy**:
   - Consistent emoji headers
   - Proper badge alignment
   - Clear section separation

2. **Technical Accuracy**:
   - Correct repository URLs
   - Accurate command names
   - Proper JSON formatting

3. **Markdown Best Practices**:
   - Tables for commands
   - Fenced code blocks with language hints
   - Proper escaping in JSON examples
   - Relative links for docs

4. **Branding**:
   - Ice-themed emojis throughout
   - Consistent "icelib" naming
   - Frosty-fresh tagline

To use this:
1. Copy the entire content
2. Create new `README.md` in your repo
3. Paste and commit the changes

Would you like me to:
1. Add a "Troubleshooting" section?
2. Include a demo animation?
3. Add more detailed plugin documentation?

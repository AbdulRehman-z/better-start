# Contributing to Start on Steroids

Thank you for considering contributing! This guide will help you understand how to contribute effectively.

## 🚀 Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/start-on-steroids.git
   cd start-on-steroids
   ```
3. **Install dependencies**:
   ```bash
   bun install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 How to Contribute

### Reporting Bugs
Found a bug? Please open an issue with:
- A clear title describing the problem
- Steps to reproduce the bug if possible
- Expected vs actual behavior
- Your environment (OS, Node version, etc.)

### Suggesting Features
Have an idea? Open an issue with:
- A clear description of the feature
- Why it would be useful
- Examples of how it would work

### Submitting Code

#### Before You Start
- Check existing issues and PRs to avoid duplicates
- Discuss major changes in an issue first
- Keep changes focused on a single feature/fix

#### Making Changes
1. Write clean, readable code
2. Follow the existing code style (We use Biome)
3. Test your changes locally:
   ```bash
   bun run dev
   bun run lint
   ```
4. Commit with clear messages:
   ```bash
   git commit -m "feat: add new authentication method"
   ```

#### Submitting a Pull Request
1. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. **Open a Pull Request** on GitHub with:
   - A clear title (e.g., "feat: add email verification")
   - Description of what changed and why
   - Link to related issues if any (e.g., "Closes #123")
   - Screenshots (optional but recommended) if UI changes are involved

3. **Wait for review** - We'll review your PR as soon as possible
4. **Make requested changes** if needed
5. Once approved, we'll merge your PR!

## ✅ Pull Request Checklist

Before submitting, make sure:
- [ ] Code runs without errors
- [ ] Tests pass (`bun run test`)
- [ ] Code is linted (`bun run lint`)
- [ ] Commits have clear messages
- [ ] PR description explains the changes
- [ ] Documentation is updated if needed

## 🎯 Commit Message Guidelines

Use conventional commits format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example: `feat: add password reset functionality`

## 🔍 Review Process

1. **We review all PRs** - Usually within 2-3 days
2. **Feedback given** - We'll suggest changes or approve
3. **You make updates** - Address any requested changes
4. **Final approval** - Once everything looks good
5. **Merge** - We'll merge your contribution!

## 💡 Development Tips

- Run `bun run dev` to start the dev server
- Use `bun run db:studio` to view/manage the database
- Check `package.json` for all available scripts
- Ask questions in issues if you're stuck!

## 🤝 Code of Conduct

Please be respectful and inclusive. See our [Code of Conduct](CODE_OF_CONDUCT.md) for details.

## 🌟 Good First Issues

New to the project? specific tasks are marked with the label `good first issue` in the [issues tab](https://github.com/your-username/start-on-steroids/issues). These are great starting points!

## ❓ Need Help?

- Open an issue with the `question` label
- Reach out in discussions
- Check existing documentation

Thank you for contributing! 🎉

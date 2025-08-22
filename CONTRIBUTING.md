# Contributing to Force Portrait Mode

Thank you for your interest in contributing to Force Portrait Mode! We welcome contributions from everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/force-portrait-mode.git`
3. Navigate to the project: `cd force-portrait-mode`
4. Install dependencies: `npm install`

## Development Setup

### Prerequisites

- Node.js 16 or later
- npm 7 or later

### Project Structure

```
├── src/                    # Core library source code
│   ├── react/             # React integration
│   ├── index.ts           # Main entry point
│   ├── types.ts           # TypeScript definitions
│   ├── utils.ts           # Utility functions
│   └── themes.ts          # Theme definitions
├── vue/                   # Vue 3 integration
├── styles/                # CSS files
├── tests/                 # Test files
├── examples/              # Usage examples
└── docs/                  # Documentation
```

### Available Scripts

- `npm run build` - Build the library
- `npm run dev` - Build in watch mode
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run format` - Format code
- `npm run type-check` - Check TypeScript types

## Making Changes

### Branch Naming

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation updates
- `chore/description` - Maintenance tasks

### Commit Messages

We use [Conventional Commits](https://conventionalcommits.org/). Please format your commit messages as:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Test additions or changes
- `chore` - Maintenance tasks

Examples:
```
feat(react): add usePortraitMode hook
fix(core): resolve overlap detection issue
docs: update README with Vue examples
test(vue): add composable tests
```

### Code Style

- Use TypeScript for all source code
- Follow the existing code style (enforced by ESLint and Prettier)
- Write meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Framework Integrations

When adding features:
1. Implement in core library first (`src/`)
2. Add React integration if applicable (`src/react/`)
3. Add Vue integration if applicable (`vue/`)
4. Update TypeScript definitions
5. Add corresponding tests

## Testing

### Writing Tests

- Place tests in the `tests/` directory
- Name test files with `.test.ts` or `.test.tsx` suffix
- Write unit tests for all new functionality
- Test both success and error cases
- Mock external dependencies appropriately

### Test Structure

```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup code
  })

  describe('specific functionality', () => {
    it('should do something specific', () => {
      // Test implementation
    })
  })
})
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test core.test.ts
```

## Submitting Changes

### Before Submitting

1. Run the full test suite: `npm test`
2. Run linting: `npm run lint`
3. Run type checking: `npm run type-check`
4. Build the project: `npm run build`
5. Update documentation if needed

### Pull Request Process

1. Create a new branch from `main`
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass
5. Update documentation
6. Commit using conventional commit format
7. Push to your fork
8. Create a pull request

### Pull Request Guidelines

- Fill out the pull request template completely
- Link any related issues
- Include screenshots for UI changes
- Keep PRs focused and atomic
- Respond to review feedback promptly

## Release Process

Releases are automated using semantic-release:

1. Merge changes to `main` branch
2. Semantic-release analyzes commit messages
3. Generates changelog and version bump
4. Publishes to npm
5. Creates GitHub release

Version bumps:
- `fix:` → patch version (1.0.1)
- `feat:` → minor version (1.1.0)
- `BREAKING CHANGE:` → major version (2.0.0)

## Documentation

When adding features or making changes:

1. Update relevant JSDoc comments
2. Update README.md if needed
3. Add or update examples
4. Update API documentation in `docs/`

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas
- Check existing issues and discussions first

Thank you for contributing! 🎉
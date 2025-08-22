# 1.0.0 (2025-08-22)


### Bug Fixes

* add explicit permissions to release workflow for semantic-release ([3e6a791](https://github.com/sai-na/force-portrait-mode/commit/3e6a791e87d20de6dab3e1d8c53b7b0a0a2d8b43))
* migrate configurations to ES module format ([e0a4cae](https://github.com/sai-na/force-portrait-mode/commit/e0a4cae7829860674a45332cafe47dd3b36f493b))
* resolve CI build failures ([4569c31](https://github.com/sai-na/force-portrait-mode/commit/4569c31fe108652b80417d7c37222fb64dd1b852))
* semantic-release permissions resolved ([fc70f05](https://github.com/sai-na/force-portrait-mode/commit/fc70f05eb41bfe84def112874aadf7729232b7e4)), closes [#1](https://github.com/sai-na/force-portrait-mode/issues/1)
* update CI build check to only expect core artifacts (no react/vue) ([bbd4178](https://github.com/sai-na/force-portrait-mode/commit/bbd417804a1eac457b69cd25be5d69a639faa295))


### Features

* optimize bundle size and add comprehensive framework support ([9918bdb](https://github.com/sai-na/force-portrait-mode/commit/9918bdbfcfff3b0489ebfe70ce7021c2d62009a2))


### major

* reduce package size by 75% - remove framework bundles ([02e9f4b](https://github.com/sai-na/force-portrait-mode/commit/02e9f4bfac96376c28094ba6ab7de6998751e029))


### BREAKING CHANGES

* Remove framework-specific exports (/react, /vue)

- Remove React and Vue specific bundles to reduce package size
- Package size: 272kB → 67kB (75% reduction)
- Total files: 11 → 6 (45% fewer files)
- Update to framework-agnostic approach using core enablePortraitMode
- Users integrate directly with framework lifecycle methods
- Update README with new integration examples
- Update CDN links to v1.2.0 and use minified CSS

Migration guide:
- Old: import { usePortraitMode } from 'force-portrait-mode/react'
- New: import { enablePortraitMode } from 'force-portrait-mode'

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Complete Vue 3 integration with composables and components
- Comprehensive Jest test suite for core functionality, React, and Vue integrations
- GitHub Actions workflows for CI/CD, security analysis, and automated releases
- Semantic versioning with automated changelog generation

### Changed
- Enhanced build system to support Vue distribution files
- Improved TypeScript definitions and exports

### Fixed
- Build artifacts now include all framework integrations

## [1.0.1] - 2024-01-20

### Changed
- Updated author information

## [1.0.0] - 2024-01-20

### Added
- Initial release of force-portrait-mode package
- Core TypeScript implementation with themes and utilities
- React integration with hooks and components
- CSS-only version with responsive positioning
- Professional build system with multiple output formats
- Comprehensive README and documentation

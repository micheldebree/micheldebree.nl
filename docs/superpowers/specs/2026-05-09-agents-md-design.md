# Design Spec: AGENTS.md for micheldebree.nl

## Goal
Create a compact, high-signal `AGENTS.md` in the repository root to help future agent sessions understand the multi-project structure and specific tooling.

## Architecture & Navigation
The repository is a collection of related projects rather than a single application:
- `/website`: Hugo-based site.
- `/cv`: Typst-based CV source.
- `/logo`: SVG-based branding assets.
- `/photos`: Source images.

## Development Workflows

### Environment
- **mise**: Used for tool versioning (Hugo).
- **Homebrew**: `Brewfile` in root and `make deps` in `website/`.
- **Make**: Primary task runner for all sub-directories.

### Website (`/website`)
- **Commands**: `make test` (dev server), `make all` (build).
- **Content**: Markdown posts in `content/posts/`.
- **Theme**: `hugo-coder` is a git subtree. Avoid direct modifications.
- **Integration**: Depends on `cv-michel_de_bree.pdf` being present in `static/` (copied from `/cv`).

### CV (`/cv`)
- **Format**: Typst (`.typ`).
- **Commands**: `make` to generate PDF and Word versions.
- **Constraint**: Maintain conciseness for AI selection optimization.

### Logo & Branding (`/logo`)
- **Color**: Main red is `#c00020`.
- **Tooling**: `svgo` and `imagemagick` for asset generation.
- **Commands**: `make` to update all minified and resized assets.

## Validation Rules
- Always run `hugo` build in `website/` to verify content changes.
- Ensure cross-project dependencies (like CV PDF) are updated if source changes.
- Adhere to existing `git subtree` workflow for theme updates.

# Contributing to React-Natives

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/wireservers/react-natives.git
   cd wireservers-ui/packages/react-natives
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Project Structure

- `src/` — TypeScript component source (ships as-is, no build step)
- `tailwind-preset.js` — Tailwind CSS preset for consumers

## Making Changes

1. Fork the repo and create a branch from `dev`.
2. Make your changes in the `src/` directory.
3. Submit a pull request targeting the `dev` branch.

## Code Style

- Use TypeScript for all source files.
- Follow existing patterns for component structure (compound components, `React.forwardRef`).
- Use NativeWind/Tailwind classes for styling.

## Reporting Issues

Open an issue on [GitHub Issues](https://github.com/wireservers/react-natives/issues) with a clear description and reproduction steps.

# Contributing to Wireservers UI

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/wireservers/wireservers-ui.git
   cd wireservers-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Expo demo app:

   ```bash
   cd demos/expo
   npx expo start
   ```

## Project Structure

- `packages/react-natives/` - Shared React Native component library (`@wireservers-ui/react-natives`)
- `demos/expo/` - Expo demo app showcasing the components

## Making Changes

1. Fork the repo and create a branch from `dev`.
2. Make your changes in the appropriate package.
3. Test your changes in the demo app.
4. Submit a pull request targeting the `dev` branch.

## Code Style

- Use TypeScript for all source files.
- Follow existing patterns for component structure (compound components, `React.forwardRef`).
- Use NativeWind/Tailwind classes for styling.

## Reporting Issues

Open an issue on [GitHub Issues](https://github.com/wireservers/wireservers-ui/issues) with a clear description and reproduction steps.

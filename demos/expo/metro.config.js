const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '../..');

const config = getDefaultConfig(__dirname);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages from
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Follow symlinks (pnpm compatibility)
config.resolver.unstable_enableSymlinks = true;

// 4. Force shared packages to resolve from a single location (prevents
//    duplicate-React errors when pnpm symlinks create multiple paths)
config.resolver.extraNodeModules = {
  react: path.resolve(__dirname, 'node_modules/react'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
  'react-native-web': path.resolve(__dirname, 'node_modules/react-native-web'),
};

module.exports = withNativeWind(config, { input: './global.css' });

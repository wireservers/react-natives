/* eslint-env node */
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");


const config = getDefaultConfig(__dirname);

config.resolver.unstable_enableSymlinks = true;
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];

// Exclude .md files from being bundled
config.resolver.assetExts = config.resolver.assetExts || [];
if (!config.resolver.assetExts.includes('md')) {
  config.resolver.assetExts.push('md');
}
config.resolver.sourceExts = (config.resolver.sourceExts || []).filter(ext => ext !== 'md');

// Both libraries are consumed as symlinks to local source, so Metro has to be told to watch
// their real directories — it will not follow a symlink outside the project root otherwise.
for (const pkg of [
  "@wireservers-ui/react-natives",
  "@wireservers-ui/react-natives-pro",
]) {
  try {
    const packagePath = path.dirname(require.resolve(`${pkg}/package.json`));
    config.watchFolders = [...new Set([...(config.watchFolders || []), packagePath])];
  } catch {
    // No-op if the package is not resolvable yet.
  }
}

module.exports = withNativeWind(config, { input: "./global.css" });

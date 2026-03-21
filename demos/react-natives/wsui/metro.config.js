/* eslint-env node */
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enableSymlinks = true;
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];

try {
  const wsuiPackagePath = path.dirname(
    require.resolve("@wireservers-ui/react-natives/package.json"),
  );
  config.watchFolders = [...new Set([...(config.watchFolders || []), wsuiPackagePath])];
} catch {
  // No-op if package is not resolvable yet.
}

module.exports = withNativeWind(config, { input: "./global.css" });

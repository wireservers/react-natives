const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Exclude .md files from being bundled
config.resolver.assetExts = config.resolver.assetExts || [];
if (!config.resolver.assetExts.includes('md')) {
	config.resolver.assetExts.push('md');
}
config.resolver.sourceExts = (config.resolver.sourceExts || []).filter(ext => ext !== 'md');

module.exports = withNativeWind(config, { input: './global.css' });

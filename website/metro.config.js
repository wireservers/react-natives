const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Allow importing .md files as plain text strings
config.resolver.sourceExts.push('md');
config.transformer.babelTransformerPath = require.resolve('./scripts/md-transformer.js');

module.exports = withNativeWind(config, { input: './global.css' });

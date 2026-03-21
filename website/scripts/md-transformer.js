/**
 * Metro transformer for .md files — returns file content as a plain JS string export.
 * Non-.md files fall through to the default Expo/Babel transformer.
 */
const defaultTransformer = require("metro-transform-plugins");
const upstreamTransformer = require("@expo/metro-config/babel-transformer");

module.exports.transform = async function (params) {
  if (params.filename.endsWith(".md")) {
    return {
      code: `module.exports = ${JSON.stringify(params.src)};`,
      dependencies: [],
      map: [],
    };
  }
  return upstreamTransformer.transform(params);
};

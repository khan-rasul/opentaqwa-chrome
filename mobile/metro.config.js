// const path = require("path");
// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require("nativewind/metro");

// const projectRoot = __dirname;
// const workspaceRoot = path.resolve(projectRoot, "..");

// const config = getDefaultConfig(projectRoot);

// config.watchFolders = [workspaceRoot];
// config.resolver.nodeModulesPaths = [
//   path.resolve(workspaceRoot, "node_modules"),
// ];
// config.resolver.disableHierarchicalLookup = true;

// config.resolver.sourceExts.push("cjs");

// module.exports = withNativeWind(config, { input: "./src/global.css" });

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./src/global.css" });

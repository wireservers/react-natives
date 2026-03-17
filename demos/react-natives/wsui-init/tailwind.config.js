const wirePreset = require("@wireservers-ui/react-natives/tailwind-preset");
module.exports = {
  content: [
    "./App.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@wireservers-ui/react-natives/src/**/*.{ts,tsx}",
  ],
  presets: [wirePreset],
};

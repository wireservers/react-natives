/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@wireservers/react-natives/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("@wireservers/react-natives/tailwind-preset")],
};

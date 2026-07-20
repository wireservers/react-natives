/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: process.env.DARK_MODE ? process.env.DARK_MODE : "class",
  content: [
    "./app/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./components/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./utils/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./*.{html,js,jsx,ts,tsx,mdx}",
    "./src/**/*.{html,js,jsx,ts,tsx,mdx}",
    // Canonical package source, so Tailwind sees the classes actually shipping on npm.
    "../packages/react-natives/src/**/*.{ts,tsx}",
    "../packages/react-natives-pro/src/**/*.{ts,tsx}",
  ],
  presets: [require("@wireservers-ui/react-natives/tailwind-preset")],
  important: "html",
};

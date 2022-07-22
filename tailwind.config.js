/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
       'highlight': '#9747FF',
       'selected': '#BD89FF', 
       'hovered': '#1ABCFE',
       'dropdown': '#4A52FF',
       'dark': '#0193FF'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake", "bumblebee", "cyberpunk", "light", "dark"],
  },
};

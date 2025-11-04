/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gold: "#625443",
        forest: "#263936",
        plum: "#5E4B56",
        "plum-light": "#B8A4B0",
        "gold-light": "#af8f69",
        "forest-light": "#8B9D98",
        "off-white": "#F5F3F0",
        ocean: "#264872",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
        quicksand: ["Quicksand"],
        "great-vibes": ["GreatVibes"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purpleDark: "#49205E",  // dark purple
        purpleMed: "#805BA5",   // medium purple
        pinkish: "#BC519E",     // pinkish tone
        limeYellow: "#D9E254",  // lime yellow
      },
    },
  },
  plugins: [],
};

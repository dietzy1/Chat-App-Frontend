/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blacky: "#17141d",
        customgray: "#28242f",
        customOrange: "#ff8a00",
        customPink: "#B03463",
        textGray: "#7a7a8c",
        bggray: "#1D2127",
        test: "#1c1921",
      },
    },
  },
  plugins: [],
};

/**
 * @format
 * @type {import('tailwindcss').Config}
 */

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
        idk: "#14141c",
        spotify1: "#1DB954",
        spotify2: "#212121",
        spotify3: "#121212",
        spotify4: "#535353",
        spotify5: "#b3b3b3",
        spotify6: "#181818",
        spotify7: "#282828",
        spotify8: "#000000",
      },
    },
  },
  plugins: [],
};

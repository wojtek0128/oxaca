/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,jpg}",
    "./pages/**/*.{js,ts,jsx,tsx,jpg}",
    "./components/**/*.{js,ts,jsx,tsx,jpg}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx, jpg}",
  ],
  theme: {
    extend: {
      colors: {
        defaultText: "#121826",
        greyBorder: "#E6E8EB",
        darkerGrey: "#E5E7EA",
        basicGrey: "#F3F4F6",
        bluePurple: "#636AE9",
        lightGreen: "#DCFCE7",
        darkGreen: "#257041",
        lightYellow: "#FEF9C3",
        darkYellow: "#8F5A1C",
        lightRed: "#FEE2E2",
        darkRed: "#DC2626",
        lightBlue: "#DBEAFE",
        darkBlue: "#4462BF",
        back: "#f1edee",
        glass: "rgba(255,255,255,0.15)"


      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backgroundImage: "url(/header_img.png)",
      },
      gridTemplateColumns: {
        "auto-fill-minmax": "repeat(auto-fill, minmax(240px, 1fr))",
      },

      height: {
        "34vw": "34vw", // Custom height using viewport width units
      },
    },
  },
  plugins: [],
};

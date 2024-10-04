/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backgroundImage: "url(/header_img.png)",
      },

      height: {
        "34vw": "34vw", // Custom height using viewport width units
      },
    },
  },
  plugins: [],
};

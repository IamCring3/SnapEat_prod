/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whiteText: "#fff",
        darkText: "#1F2937",
        lightText: "#9b9b9b",
        primary: "#DC2626",
        secondary: "#FF4D4D",
        accent: "#FF9999",
        background: "#FFF5F5",
        card: "#FFE5E5",
        border: "#FFB3B3",
        skyText: "#0284C7",
      },
      flex: {
        full: "0 0 100%",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

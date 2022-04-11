module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      backgroundImage: {
        "bg-image": "url('/src/assets/bg-image.jpg')",
      },
      backgroundColor: {
        secondary: "#f50057",
        opacity: "rgba(0, 0, 0, 0.3)",
      },
      boxShadow: {
        final: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        button:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
      },
    },
  },

  plugins: [],
};

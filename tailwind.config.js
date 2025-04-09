/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        "xxs:": "390px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1275px",
        "2xl": "1440px",
      },
      maxWidth: {
        base: "98.75rem",
        secondary: "62.9375rem",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        mulish: ["Mulish", "monospace"],
        montserrat: ["Montserrat", "monospace"],
      },
      colors: {
        brand: {
          link: {
            DEFAULT: "#989898",
            hover: "#626262",
          },
          text: {
            DEFAULT: "#6D7D8B",
          },
          black: {
            DEFAULT: "333333",
            dark: "#141414",
          },
          gray: {
            DEFAULT: "#909090",
            100: "#D9D9D9",
            200: "#999999",
            300: "#BBC8D4",
          },
          whitish: "#FDFDFD",
          purple: "#8771DB",
          red: "#CD3235",
        },
      },
      borderRadius: {
        10: "10px",
        20: "20px",
        35: "35px",
        30: "30px",
        45: "45px",
      },
      borderSpacing: {
        3: "3px",
      },
      backgroundImage: {
        button: "url('../assets/images/button.png')",
        "cards-hero":
          "linear-gradient(90deg, rgba(170, 151, 234, 0.95) 8.77%, rgba(170, 151, 234, 0.095) 73.06%);",
        "cards-hero-mobile":
          "linear-gradient(0deg, rgba(170, 151, 234, 0.95) 8.77%, rgba(170, 151, 234, 0.095) 73.06%);",
        whitish:
          "linear-gradient(0deg, #FFF 49.28%, rgba(255, 255, 255, 0.00) 99.95%);",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".text-trsprt-section-title": {
          background:
            "url('../assets/bg-images/hero-left.png') -20px -20px no-repeat",
          "-webkit-text-fill-color": "transparent",
          "-webkit-background-clip": "text",
          transition: "background 0.3s ease-in-out",
        },
        ".group:hover .text-trsprt-section-title": {
          background:
            "linear-gradient(90deg, #7D3C98, #D2B4DE)" /* Example brand purple gradient */,
        },
      });
    },
  ],
};

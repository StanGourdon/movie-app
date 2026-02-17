/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4EBCFF",
        secondary: "#2972b6",     
        tertiary: "	#002790",
        quaternary: "#945cb4",
        background: "#FFFFFF",
        backgroundModal : "#945CB4",    
        border :  "#945CB4"

      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.3)",
      },
      borderRadius: {
        card: "32px",
        button: "8px",
        search: "9999px"
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
}

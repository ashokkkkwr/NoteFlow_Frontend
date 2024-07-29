/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Inter', 'sans-serif'], // Added both Roboto and Inter fonts
      },
    },
  },
  plugins: [],
}

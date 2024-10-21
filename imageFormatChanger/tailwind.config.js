/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#FAF7F0',
        'container-bg': '#D8D2C2',
        'footer-light': '#E5E5E5',
        'footer-dark': '#1A202C',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'doka-yellow': '#fd0',
        'doka-blue': '#004588',
      },
    },
  },
  plugins: [],
}


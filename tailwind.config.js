const defaultTheme = require('tailwindcss/defaultTheme');


/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        bold: ['Poppins']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

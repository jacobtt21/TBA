const defaultTheme = require('tailwindcss/defaultTheme');


/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('https://raw.githubusercontent.com/Oustro/OustroImages/acd2f860bae927df1d5a54e218b5dfdd755d2868/cards%20(1).svg')"      
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

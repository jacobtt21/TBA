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
      backgroundImage: {
        'hero': "url('https://raw.githubusercontent.com/Oustro/OustroImages/9155909854381e9cb82e00608c6969b79d0111f9/bgTBA.svg')",
        'herobg': "url('https://github.com/Oustro/OustroImages/blob/main/nehero-big.png?raw=true')"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

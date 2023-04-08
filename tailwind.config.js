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
        'hero': "url('https://raw.githubusercontent.com/Oustro/OustroImages/e274c7beaf4c3ec8b41df9f5421caeae06a63947/bg-more.svg')",
        'calbg': "url('https://raw.githubusercontent.com/Oustro/OustroImages/39df7fa31573e256970532fc1b42a3d5164ee4db/calbg.svg')",
        'more': "url('https://raw.githubusercontent.com/Oustro/OustroImages/e274c7beaf4c3ec8b41df9f5421caeae06a63947/bg-more.svg')"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

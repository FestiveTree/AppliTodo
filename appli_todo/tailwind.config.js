const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Poppins', 'system-ui', 'sans-serif'],
      body: ['Poppins', 'system-ui', 'sans-serif'],
    },
    colors: {
     "background-gris":"#1e1e1e",
     transparent: 'transparent',
     current: 'currentColor',
     black: colors.black,
     white: colors.white,
     gray: colors.trueGray,
     indigo: colors.indigo,
     red: colors.rose,
     amber: colors.amber,
     green: colors.green,
     blue: colors.blue,
     pink: colors.pink,
     orange: colors.orange,
     yellow: colors.yellow,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

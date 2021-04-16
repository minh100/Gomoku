module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'title': ['Permanent Marker', 'cursive']
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 37px))',
      },
      gridTemplateRows: {
        '15': 'repeat(15, minmax(0, 37px))',
      },
      backgroundColor: {
        'light': '#FFFCF9'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

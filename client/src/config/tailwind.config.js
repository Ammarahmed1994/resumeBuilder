module.exports = {
  purge: {
    enabled: true,
    content: ['../**/*.tsx']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        wedsColor: {
          DEFAULT: '#024D4C'
        }
      }
    }
  },
  variants: {
    outline: ['focus'],
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')]
};

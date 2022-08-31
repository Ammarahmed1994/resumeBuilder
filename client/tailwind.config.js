module.exports = {
  purge: {
    enabled: true,
    content: ['../**/*.tsx', './node_modules/@themesberg/flowbite/dist/*.js']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    placeholderColor: {
      primary: '#9D9FA0'
    },
    extend: {
      colors: {
        wedsColor: {
          DEFAULT: '#024D4C'
        },
        fbcolor: '#1D4ED8',
        bordersearch: '#808080',
        newGray: '#7C7C7C',
        samePrimary: '#9D9FA0'
      }
    }
  },
  variants: {
    outline: ['focus'],
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@themesberg/flowbite/plugin')
  ]
};

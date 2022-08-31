// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('autoprefixer'),
        require('tailwindcss')('./tailwind.config.js')
      ]
    }
  }
};

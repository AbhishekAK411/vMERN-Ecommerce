/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        'shadow1': 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'
      }
    },
  },
  plugins: [],
})


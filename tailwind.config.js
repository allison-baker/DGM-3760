/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/*.js'],
  safelist: [
    {
      pattern: /border-\[#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\]/
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


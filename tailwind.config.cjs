/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'blue-windows': '#006DAE'
      },
      backgroundColor: {
        dark: '#1e1e1e'
      }
    }
  },
  plugins: []
}

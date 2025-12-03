/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,ts,jsx,tsx}', // Esto asegura que Tailwind detecte las clases usadas en tus archivos
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

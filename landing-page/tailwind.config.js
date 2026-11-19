/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#F4F2EF',
        'surface': '#FFFFFF',
        'brand-primary': '#213E60',
        'accent-orange': '#E68C3A',
        'accent-blue': '#94B6EF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        satoshi: ['Satoshi', 'system-ui', 'sans-serif'],
        boska: ['Boska', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

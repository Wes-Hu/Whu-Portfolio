/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'night': '#090A0C',
        'blood-red': '#70110A',
        'blood-red-light': '#9F180E',
        'burnt-sienna': '#EE6C4D',
        'coral': '#F38D68',
      },
    },
  },
  plugins: [],
}


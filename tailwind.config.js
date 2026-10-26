/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1F3A2B',
          dark: '#16271D',
          light: '#2E5740',
        },
        charcoal: '#222222',
        cream: '#F7F4EE',
        orange: {
          DEFAULT: '#F26B1D',
          dark: '#D85A10',
          light: '#F89052',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Oswald', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

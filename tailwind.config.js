/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#FDF6F0',
          100: '#FCF0EA',
          200: '#F5D0C5',
          300: '#E8B4B8',
          400: '#D4A5A5',
          500: '#C9929A',
          600: '#9B7E93',
        },
        lavender: {
          300: '#C9B8D4',
          400: '#B8A9C9',
          500: '#9B7E93',
        },
        sage: {
          400: '#A8B5A0',
        },
      },
      fontFamily: {
        serif: ['GenWanMin', 'serif'],
        sans: ['Noto Sans TC', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}

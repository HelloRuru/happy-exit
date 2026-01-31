/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#D4A5A5',
        secondary: '#B8A9C9',
        rose: { 50: '#FDF6F0', 100: '#FCF0EA', 200: '#F5D0C5', 300: '#E8B4B8', 400: '#D4A5A5', 500: '#C9929A', 600: '#9B7E93' },
        lavender: { 300: '#C9B8D4', 400: '#B8A9C9', 500: '#9B7E93' },
      },
      fontFamily: {
        heading: ['SweiSpringCJKtc-Sugar', 'Noto Sans TC', 'sans-serif'],
        body: ['SweiSpringCJKtc', 'Noto Sans TC', 'sans-serif'],
        sans: ['Noto Sans TC', 'sans-serif'],
      },
      borderRadius: { '3xl': '24px' },
      boxShadow: {
        'ds-sm': '0 2px 8px rgba(212, 165, 165, 0.08)',
        'ds-md': '0 4px 24px rgba(212, 165, 165, 0.12)',
        'ds-lg': '0 12px 48px rgba(212, 165, 165, 0.2)',
      },
    },
  },
  plugins: [],
}

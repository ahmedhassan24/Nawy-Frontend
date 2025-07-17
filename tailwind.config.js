/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
      'bg-nawy-primary',
      'text-nawy-primary',
      'bg-nawy-accent',
      'text-nawy-accent',
    ],
  theme: {
    extend: {
      colors: {
        nawy: {
          primary: '#152238',
          accent: '#00C4CC',
          light: '#F6F6F6',
          text: '#4B4B4B',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        modalPop: {
          '0%': { opacity: 0, transform: 'scale(0.95) translateY(40px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease',
        modalPop: 'modalPop 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
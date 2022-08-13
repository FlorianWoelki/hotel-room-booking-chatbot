const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'typing-indicator': '1.2s typing-dot ease-in-out infinite',
      },
      keyframes: {
        'typing-dot': {
          '15%': {
            transform: 'translateY(-35%)',
            opacity: '0.5',
          },
          '30%': {
            transform: 'translateY(0%)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-150': { 'animation-delay': '150ms' },
        '.animation-delay-250': { 'animation-delay': '250ms' },
      });
    }),
  ],
};

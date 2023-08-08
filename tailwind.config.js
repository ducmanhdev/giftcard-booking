/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        sm: '1224px',
      },
    },
    extend: {
      colors: {
        primary: '#5669FF',
        secondary: '#DFE3FF',
        success: '#13BC8E',
        danger: '#EF476F',
        body: '#222222',
        body2: '#373737',
        C2F: '#2F2C35',
        black: '#000',
        white: '#fff',
        CDD: '#DDDDE8',
        C8A: '#8A8A8A',
        CA9: '#A9A6BE',
        CF4: '#F4F6FE',
        CD1: '#D1D1D1',
      },
      boxShadow: {
        DEFAULT: '0px 4px 12px rgba(0,0,0,0.1)',
        MD: '0px 8px 16px 0 rgba(0,0,0,0.08)',
      },
      border: {
        DEFAULT: '#DDDDE8',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
  ],
};

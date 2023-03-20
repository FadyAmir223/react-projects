/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  important: true,
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        softBlue: 'hsl(231, 69%, 60%)',
        softRed: 'hsl(0, 94%, 66%)',

        facebook: '#1877f2',
        twitter: '#1da1f2',
        pinterse: '#e60023',
        reddit: '#ff4500',
        whatsapp: '#25d366',
        linkedin: '#0a66c2',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      animation: {
        // scale: 'scale 3s linear infinite',
      },
    },
  },
  plugins: [], // require('@tailwindcss/line-clamp')
};

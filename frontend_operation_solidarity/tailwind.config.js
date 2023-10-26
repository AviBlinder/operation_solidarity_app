/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    // customized font-weights
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    boxShadow: {
      xs: '0px 1px 2px 0px rgba(11,10, 55,0.55)',
      sm: '0px 2px 4px 0px rgba(11,10, 55,0.55)',
      lg: '0px 8px 20px 0px rgba(18,16, 99,0.06)',
    },
    fontSize: {
      xs: ['14px', { lineHeight: '24px', letterSpacing: '-0.03em' }],
      sm: ['16px', { lineHeight: '28px', letterSpacing: '-0.03em' }],
      lg: ['18px', { lineHeight: '28px', letterSpacing: '-0.03em' }],
      xl: ['24px', { lineHeight: '36px', letterSpacing: '-0.03em' }],
      '2xl': ['36px', { lineHeight: '48px', letterSpacing: '-0.032em' }],
      '3xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.032em' }],
      '4xl': ['56px', { lineHeight: '64px', letterSpacing: '-0.032em' }],
      '5xl': ['80px', { lineHeight: '80px', letterSpacing: '-0.032em' }],
      '6xl': ['110px', { lineHeight: '85px', letterSpacing: '-0.032em' }],
    },

    extend: {
      colors: {
        // palette #2
        primary: {
          50: '#f2f7fd',
          100: '#e3edfb',
          200: '#c1dbf6',
          300: '#8bbdee',
          400: '#388fe0',
          500: '#267ed1',
          600: '#1762b2',
          700: '#144e90',
          800: '#154477',
          900: '#173a63',
          950: '#0f2542',
        },
        secondary: {
          50: '#fcf8ee',
          100: '#f7ebce',
          200: '#eed599',
          300: '#e7c173',
          400: '#dea341',
          500: '#d6862a',
          600: '#bd6722',
          700: '#9d4a20',
          800: '#803b20',
          900: '#6a321d',
          950: '#3c190c',
        },
        supporting1: colors.cyan,
        supporting2: colors.red,
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/typography'),
  ],
};

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

    extend: {
      colors: {
        // palette #2
        primary: {
          DEFAULT: 'hsl(205, 76%, 39%)',
          900: 'hsl(205, 100%, 21%)',
          800: 'hsl(205, 65%, 55%)',
          700: 'hsl(205, 87%, 29%)',
          600: 'hsl(205, 74%, 65%)',
          500: 'hsl(205, 82%, 33%)',
          400: 'hsl(205, 84%, 74%)',
          300: 'hsl(205, 76%, 39%)',
          200: 'hsl(205, 97%, 85%)',
          100: 'hsl(205, 67%, 45%)',
          50: 'hsl(205, 79%, 92%)',
        },
        secondary: {
          DEFAULT: 'hsl(36, 77%, 49%)',
          900: 'hsl(15, 86%, 30%)',
          800: 'hsl(44, 92%, 63%)',
          700: 'hsl(22, 82%, 39%)',
          600: 'hsl(48, 94%, 68%)',
          500: 'hsl(29, 80%, 44%)',
          400: 'hsl(48, 95%, 76%)',
          300: 'hsl(36, 77%, 49%)',
          200: 'hsl(48, 100%,88%)',
          100: 'hsl(42, 87%, 55%)',
          50: 'hsl(49, 100%,96%)',
        },
        neutral: {
          900: 'hsl(209, 61%, 16%)',
          800: 'hsl(209, 23%, 60%)',
          700: 'hsl(211, 39%, 23%)',
          600: 'hsl(211, 27%, 70%)',
          500: 'hsl(209, 34%, 30%)',
          400: 'hsl(210, 31%, 80%)',
          300: 'hsl(209, 28%, 39%)',
          200: 'hsl(212, 33%, 89%)',
          100: 'hsl(210, 22%, 49%)',
          50: 'hsl(210, 36%, 96%)',
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

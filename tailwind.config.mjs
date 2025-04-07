/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          secondary: 'var(--base-secondary-color)',
          tetriary: 'var(--base-tetriary-color)',
        },
        accented: {
          primary: 'var(--accented-primary-color)',
          secondary: 'var(--accented-secondary-color)',
        },
        //   fontFamily: {
        //     mono: ['var(--font-geist-mono)'],
        //     sans: ['var(--font-geist-sans)'],
        //   },
      },
    },
  },
};

export default config;

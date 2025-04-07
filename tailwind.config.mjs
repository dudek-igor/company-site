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
        fontFamily: {
          sans: ['var(--font-sans)', 'sans-serif'],
          mono: ['var(--font-mono)', 'monospace'],
        },
      },
    },
  },
};

export default config;

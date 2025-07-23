import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/types/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    // Override Tailwind's default spacing
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.5rem',
      1: '1rem',
      1.5: '1.5rem',
      2: '2rem',
      2.5: '2.5rem',
      3: '3rem',
      3.5: '3.5rem',
      4: '4rem',
      5: '5rem',
      6: '6rem',
      7: '7rem',
      8: '8rem',
      9: '9rem',
      10: '10rem',
      11: '11rem',
      12: '12rem',
      14: '14rem',
      16: '16rem',
      20: '20rem',
      24: '24rem',
      28: '28rem',
      32: '32rem',
      36: '36rem',
      40: '40rem',
      44: '44rem',
      48: '48rem',
      52: '52rem',
      56: '56rem',
      60: '60rem',
      64: '64rem',
      72: '72rem',
      80: '80rem',
      96: '96rem',
    },
    // Override Tailwind's default font sizes
    fontSize: {
      10: '10rem',
      11: '11rem',
      12: '12rem',
      16: '16rem',
      20: '20rem',
    },
    // Override Tailwind's default font family
    fontFamily: {
      pretendard: [
        'var(--font-pretendard)',
        'Arial',
        'Helvetica',
        'sans-serif',
      ],
    },
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      primary: '#FF627B',
      'gray-00': '#250F09',
      'gray-30': '#575665',
      'gray-50': '#9C9EB0',
      'gray-90': '#F0EEEE',
      orange: '#FFB559',
    },
    borderWidth: {
      DEFAULT: '1rem',
      0: '0',
      2: '2rem',
      4: '4rem',
      8: '8rem',
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('active', '&.active');
    }),
  ],
};

export default config;

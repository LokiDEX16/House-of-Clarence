import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#d4af37',
          600: '#c9a027',
        },
      },
      backgroundColor: {
        'base-900': '#0a0a0a',
        'base-800': '#1f1f1f',
      },
      textColor: {
        'base-50': '#ededed',
        'base-100': '#e5e5e5',
        'base-300': '#a3a3a3',
        'base-400': '#737373',
        'base-700': '#404040',
      },
    },
  },
  plugins: [daisyui],
  // @ts-ignore - DaisyUI config is not typed in Tailwind's UserConfig
  daisyui: {
    themes: ['dark'],
  },
} satisfies Config;

export default config;

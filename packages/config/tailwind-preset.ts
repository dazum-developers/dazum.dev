import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './apps/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        pwa: { raw: '(display-mode: standalone)' },
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'none' },
        },
        spinning: {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 600ms var(--animation-delay, 0ms) cubic-bezier(.21,1.02,.73,1) forwards',
        spinning: 'spinning 0.75s linear infinite',
      },
      boxShadow: {
        dropdown: '0px 2px 6px -1px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        cal: ['var(--font-cal)', ...fontFamily.serif],
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // eslint-disable-next-line
    require('tailwind-scrollbar')({ nocompatible: true }),
    // require('tailwindcss-radix')(),
    require('@savvywombat/tailwindcss-grid-areas'),
    // eslint-disable-next-line
    plugin(({ addVariant }: any) => {
      addVariant('mac', '.mac &')
      addVariant('windows', '.windows &')
      addVariant('ios', '.ios &')
    }),
    // eslint-disable-next-line
    plugin(({ addBase, theme }: any) => {
      addBase({
        hr: {
          borderColor: theme('subtle'),
        },
      })
    }),
  ],
  variants: {
    scrollbar: ['dark'],
  },
}

export default config

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: '#4A2B12',
          green: '#3B5E2B',
          light: '#FDFBF7',
          gold: '#D99B38', // For the diya/sun glow
        }
      },
    },
  },
  plugins: [],
}
export default config
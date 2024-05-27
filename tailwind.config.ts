import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary-white': '#F1F2EB',
        'primary-white-hover': '#e6e8dc',
        'secondary-white': '#EFEFEF',
        'primary-black': '#131515',
        'secondary-black': '#8F918D',
        'interactive': '#e1ed3e'
      },
      textColor: {
        'primary-white': '#F1F2EB',
        'secondary-white': '#EFEFEF',
        'primary-black': '#131515',
        'secondary-black': '#8F918D',
        'interactive': '#e1ed3e'
      },
      borderColor: {
        'primary-white': '#F1F2EB',
        'secondary-white': '#EFEFEF',
        'primary-black': '#131515',
        'secondary-black': '#8F918D',
        'interactive': '#e1ed3e'
      }
    }
  },
  plugins: []
}
export default config

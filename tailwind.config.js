/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,vue,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      'subtitle': [
        '1.125rem', {
          lineHeight: '',
          fontWeight: '700'
        }
      ],
      'body-r': [
        '1rem', // 16px
        {
          lineHeight: '',
          fontWeight: '400'
        }],
      'body-b': [
        '1rem', // 16px
        {
          lineHeight: '',
          fontWeight: '700'
        }],
      'caption-r': [
        '0.75rem', // 12px
        {
          lineHeight: '',
          fontWeight: '400'
        }],
      'caption-b': [
        '0.75rem', // 12px
        {
          lineHeight: '',
          fontWeight: '700'
        }],
    },
    colors: {
      primary: '#FEBE31',
      red: '#FF6C6C',
      'light-green': '#8ACFA7',
      green: '#66BE8B',
      'dark-green': '#489B6D',
      gray: '#CDCDCD',
      'dark-gray': '#7E7E7E',
      transBlack: {
        '15': 'rgba(0, 0, 0, 0.15)',
      }
    },
    extend: {},
  },
  plugins: [],
}


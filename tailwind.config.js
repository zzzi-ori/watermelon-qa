/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,vue,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'title': [
          '2.25rem', {
            lineHeight: '2.25rem',
            fontWeight: '900',
          },
        ],
        'subtitle': [
          '1.125rem', {
            lineHeight: '',
            fontWeight: '700',
          },
        ],
        'body-r': [
          '1rem', // 16px
          {
            lineHeight: '24px',
            fontWeight: '400',
          }],
        'body-b': [
          '1rem', // 16px
          {
            lineHeight: '24px',
            fontWeight: '700',
          }],
        'caption-r': [
          '0.75rem', // 12px
          {
            lineHeight: '',
            fontWeight: '400',
          }],
        'caption-b': [
          '0.75rem', // 12px
          {
            lineHeight: '',
            fontWeight: '700',
          }],
        'banner-r': [
          '0.875rem', // 12px
          {
            lineHeight: '',
            fontWeight: '500',
          }],
        'banner-b': [
          '0.875rem', // 12px
          {
            lineHeight: '',
            fontWeight: '900',
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
          '10': 'rgba(0, 0, 0, 0.1)',
          '15': 'rgba(0, 0, 0, 0.15)',
          '50': 'rgba(0, 0, 0, 0.5)',
          '90': 'rgba(0, 0, 0, 0.9)',
        },
        'gradient-yellow': '#FFEC45',
        'gradient-pink': '#FF8181',
      },
    },
  },
  plugins: [],
}


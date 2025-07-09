/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'banner-dark': '#353334',
        'banner-light': '#727375',
        'client-yellow': '#fff101',
        'client-dark': '#353334',
        'client-background': '#e5e7e8',
        'client-table-banner': '#353334',

        'table-header-row-background': '#353334',
        'table-row-hover-background': '#e6e7e9',
        'table-row-selected-background': '#fff101',
        'table-row-selected-hover-background': '#fef9c3',

      },
      fontFamily: {
        Roboto: ['"Roboto Condensed"', ...defaultTheme.fontFamily.serif],
        Roboto: ['Roboto', ...defaultTheme.fontFamily.serif],
      },
      gridTemplateColumns: {
        'product-table':
          // '3rem minmax(min-content, 7rem) 1fr 4rem 4rem 5rem 5rem 5rem 6rem',
          'minmax(min-content, 3rem) minmax(min-content, 7rem) minmax(200px, 1fr) minmax(min-content, 6rem)  minmax(min-content, 6rem)  minmax(min-content, 6rem) minmax(min-content, 4rem) minmax(min-content, 4rem) minmax(min-content, 4rem) minmax(min-content, 4rem) minmax(min-content, 3rem) minmax(90px, 6rem)',
      },
    },
  },
  plugins: [],
};

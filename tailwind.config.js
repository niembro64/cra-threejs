/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      utilities: {
        '.image-crisp': {
          'image-rendering': 'pixelated',
        },
        '.image-smooth': {
          'image-rendering': 'auto',
        },
      },
      // Add any custom colors, fonts, spacing, etc. you need
      colors: {
        // example:
        'niemo-teal': '#00ffff',
      },
    },
  },
  plugins: [
    // optionally add scrollbar plugin, typography, etc.
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};

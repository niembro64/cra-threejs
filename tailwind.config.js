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

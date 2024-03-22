module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './src/pages/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B73E8',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};

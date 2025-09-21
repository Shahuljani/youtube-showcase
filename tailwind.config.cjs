module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5fbff',
          100: '#eaf7ff',
          500: '#0ea5a4', // teal-ish
          700: '#0b7f7e'
        }
      },
      fontFamily: {
        telugu: ['"Ramabhadra"', 'serif'],
      }
    }
  },
  plugins: [],
}

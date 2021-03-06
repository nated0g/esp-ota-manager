module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'sans': ['"Inter var"']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
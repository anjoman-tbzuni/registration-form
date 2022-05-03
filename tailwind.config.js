module.exports = {
  content: [
    './app.vue',
    './pages/**/*.vue',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './plugins/**/*.{js,ts}',
    './assets/**/*.scss',
    './assets/**/*.css',
  ],
  theme: {
    extend: {
      letterSpacing: {
        widest: '1rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

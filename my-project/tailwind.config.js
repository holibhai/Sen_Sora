/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(png|jpe?g|gif)$/i,
  //       type: 'asset/resource',
  //     },
  //   ],
  // },
  plugins: [],
}


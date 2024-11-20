/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      height: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
};

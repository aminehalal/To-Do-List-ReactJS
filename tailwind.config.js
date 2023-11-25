/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily :{
        "kanit" : ["Kanit" , "sans-serif"],
      },
      width : {
        '96' : '34rem',
        '80' : '26rem'
      }
    },
  },
  plugins: [],
}


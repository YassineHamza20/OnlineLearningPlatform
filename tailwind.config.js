/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
        'button' : '#FFA447',
        'backg' : '#F9F4F0', 
        'elements' : '#87A922',
        'button2' : '#F28585',
        'darkg' : '#767676',
        'lightg': '#E5E5E5',
        'lightbutton': '#FFF2E5',
        'errorbg' : '#ecc8c5',
        'errortext': '#c03b3a',
        'successbg': '#def2d6',
        'lightGreen': '#F1FAF0',
        'cellColor': '#FFD1A3',
        'hoverOrange': 'orange-600',
        'disabled': '#BBBBBB',
        'active' : '#413F42',
        'lightButton2' : '#fbdcdc',
        'star' : '#FFCD3C',
        'lightYellow': '#fffec8',
        'lightRed': '#ffdadb',
        'textRed': '#ff6c70'


      }
    },
  },
  plugins: [],
}


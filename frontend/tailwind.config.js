/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'yellow': '#FFC244',
      'light-yellow': '#FFDE99',
      'green': '#00A082',
      'green-700': 'rgba(0, 160, 130, 70%)',
      'light-green': '#E5F4FC',
      'white': '#FFFFFF',
      'black': '#000000',
      'powder-blue': "#CCECE6",
      'red': "#FF0000",
      'light-grey': '#D3D3D3',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      logo: ['Inria Serif'],
    },
    extend: {},
  },
  plugins: [],
}
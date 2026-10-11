export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    fontFamily: { sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'], head: ['Sora', '"Nunito Sans"', 'sans-serif'] },
    colors: { ocean: { DEFAULT: '#0b3f4a', 700: '#12535f', 900: '#07262d' }, sand: { DEFAULT: '#f7f2e8', 2: '#ece3d0' }, foam: { DEFAULT: '#bfe3d8', 2: '#e3f3ee' }, coral: '#c8553a', ink: '#12262b' },
    boxShadow: { soft: '0 2px 4px rgba(7,38,45,.05), 0 18px 40px -12px rgba(7,38,45,.2)' },
  } },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        ivory: '#F8F4EE',
        champagne: '#EDE1CF',
        'warm-beige': '#E8D9C5',
        'soft-blush': '#F6EDE8',
        'muted-gold': '#B08D57',
        'deep-gold': '#8E7142',
        'rich-gold': '#C4A265',
        espresso: '#1C1210',
        'dark-espresso': '#0E0907',
        'warm-gray': '#5C4F44',
        'light-gray': '#9B8E82',
        'rose-tint': '#F4EBE6',
        accent: '#B08D57',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3.2rem, 9vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.035em', fontWeight: '300' }],
        'hero-sub': ['clamp(2.2rem, 5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '300' }],
        'section': ['clamp(2rem, 4.5vw, 3.8rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '300' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(28, 18, 16, 0.03)',
        'card': '0 2px 8px rgba(28, 18, 16, 0.02), 0 8px 32px rgba(176, 141, 87, 0.05)',
        'card-hover': '0 8px 24px rgba(28, 18, 16, 0.04), 0 20px 60px rgba(176, 141, 87, 0.08)',
        'elevated': '0 12px 40px rgba(28, 18, 16, 0.06), 0 4px 16px rgba(176, 141, 87, 0.04)',
        'luxury': '0 24px 80px rgba(176, 141, 87, 0.10), 0 8px 24px rgba(28, 18, 16, 0.03)',
        'glow-gold': '0 0 60px rgba(176, 141, 87, 0.12)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C4A265 0%, #B08D57 50%, #8E7142 100%)',
        'subtle-radial': 'radial-gradient(ellipse at 50% 0%, rgba(237, 225, 207, 0.4) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

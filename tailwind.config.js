/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFDF7',
        ivory: '#FBF7F2',
        champagne: '#F0E4D1',
        'warm-beige': '#EDE0CF',
        'soft-tan': '#D4C4AD',
        'muted-gold': '#B8956B',
        'deep-gold': '#9A7B55',
        'rich-gold': '#C8A87C',
        espresso: '#2C1810',
        'dark-espresso': '#1A0E08',
        'warm-gray': '#6B5B4E',
        'rose-tint': '#F9F1ED',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'hero': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'luxury': '0 2px 20px rgba(184, 149, 107, 0.06)',
        'luxury-md': '0 8px 40px rgba(184, 149, 107, 0.08)',
        'luxury-lg': '0 16px 60px rgba(184, 149, 107, 0.10)',
        'luxury-xl': '0 24px 80px rgba(184, 149, 107, 0.14)',
        'card': '0 1px 3px rgba(44, 24, 16, 0.04), 0 6px 24px rgba(184, 149, 107, 0.06)',
        'card-hover': '0 4px 12px rgba(44, 24, 16, 0.06), 0 16px 48px rgba(184, 149, 107, 0.10)',
        'glow': '0 0 40px rgba(200, 168, 124, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}

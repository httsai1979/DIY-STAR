/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#F5F5F7',
          card: '#FFFFFF',
          text: '#1D1D1F',
          subtext: '#86868B',
          accent: '#007AFF', // Classic Apple Blue
          warning: '#FF9500',
          danger: '#FF3B30',
          success: '#34C759',
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        'apple': '20px',
        'apple-lg': '28px',
      },
      boxShadow: {
        'apple': '0 4px 24px 0 rgba(0, 0, 0, 0.04)',
        'apple-hover': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}

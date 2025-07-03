/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#5B4FE8',
        secondary: '#8B85F0',
        accent: '#FF6B6B',
        surface: '#FFFFFF',
        background: '#F8F9FC',
        success: '#4ECB71',
        warning: '#FFB84D',
        error: '#FF5757',
        info: '#4D9FFF',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      animation: {
        'bounce-soft': 'bounce 0.5s ease-in-out',
        'scale-down': 'scale-down 0.3s ease-out',
        'checkmark': 'checkmark 0.3s ease-out',
      },
      keyframes: {
        'scale-down': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0.7' }
        },
        'checkmark': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
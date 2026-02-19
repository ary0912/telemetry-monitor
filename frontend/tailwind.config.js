/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },

      backgroundImage: {
        'gradient-lab': 'linear-gradient(135deg, #0f1437 0%, #1a2547 100%)',
        'gradient-accent': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        'gradient-chart': 'linear-gradient(180deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0) 100%)'
      },
      boxShadow: {
        'lab': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'lab-lg': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'lab-sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(6, 182, 212, 0.2)',
        'glow-strong': '0 0 30px rgba(6, 182, 212, 0.4)'
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-in': 'slide-in 0.3s ease-out'
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        'slide-in': {
          'from': { opacity: '0', transform: 'translateY(-10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      transitionDuration: {
        '350': '350ms'
      }
    }
  },
  plugins: []
};

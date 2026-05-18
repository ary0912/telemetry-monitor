/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],

  theme: {
    extend: {
      /* ===================================================== */
      /* COLORS */
      /* ===================================================== */

      colors: {
        /* BASE */

        canvas: '#050816',
        'canvas-elevated': '#0A1020',

        /* SURFACES */

        surface: {
          primary: 'rgba(255,255,255,0.03)',
          secondary: 'rgba(255,255,255,0.05)',
          tertiary: 'rgba(255,255,255,0.08)',
          elevated: 'rgba(255,255,255,0.12)'
        },

        /* BORDERS */

        border: {
          primary: 'rgba(255,255,255,0.08)',
          secondary: 'rgba(255,255,255,0.12)',
          strong: 'rgba(255,255,255,0.18)'
        },

        /* TEXT */

        text: {
          primary: 'rgba(255,255,255,0.96)',
          secondary: 'rgba(255,255,255,0.68)',
          muted: 'rgba(255,255,255,0.42)'
        },

        /* OPERATIONAL */

        telemetry: '#22d3ee',
        stream: '#60a5fa',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        ai: '#a78bfa',

        /* SPECIAL */

        glow: {
          cyan: 'rgba(34,211,238,0.18)',
          blue: 'rgba(96,165,250,0.18)',
          purple: 'rgba(167,139,250,0.18)'
        }
      },

      /* ===================================================== */
      /* TYPOGRAPHY */
      /* ===================================================== */

      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ],

        mono: [
          'JetBrains Mono',
          'Fira Code',
          'monospace'
        ]
      },

      fontSize: {
        hero: [
          'clamp(4rem, 8vw, 7rem)',
          {
            lineHeight: '0.92',
            letterSpacing: '-0.06em',
            fontWeight: '650'
          }
        ],

        'display-xl': [
          'clamp(3rem, 6vw, 5rem)',
          {
            lineHeight: '0.96',
            letterSpacing: '-0.05em',
            fontWeight: '650'
          }
        ],

        'display-lg': [
          'clamp(2.25rem, 5vw, 3.5rem)',
          {
            lineHeight: '1',
            letterSpacing: '-0.04em',
            fontWeight: '600'
          }
        ]
      },

      /* ===================================================== */
      /* RADIUS */
      /* ===================================================== */

      borderRadius: {
        xs: '10px',
        sm: '14px',
        md: '18px',
        lg: '26px',
        xl: '32px',
        '2xl': '40px'
      },

      /* ===================================================== */
      /* SHADOWS */
      /* ===================================================== */

      boxShadow: {
        soft:
          '0 10px 40px rgba(0,0,0,0.25)',

        glow:
          '0 0 80px rgba(34,211,238,0.08)',

        floating:
          `
          0 20px 60px rgba(0,0,0,0.35),
          0 0 1px rgba(255,255,255,0.08)
          `
      },

      /* ===================================================== */
      /* BACKDROP BLUR */
      /* ===================================================== */

      backdropBlur: {
        xs: '2px',
        sm: '6px',
        md: '12px',
        lg: '20px',
        xl: '30px',
        '2xl': '40px'
      },

      /* ===================================================== */
      /* SPACING */
      /* ===================================================== */

      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        section: '8rem'
      },

      /* ===================================================== */
      /* ANIMATION */
      /* ===================================================== */

      transitionTimingFunction: {
        premium:
          'cubic-bezier(0.22, 1, 0.36, 1)'
      },

      transitionDuration: {
        fast: '180ms',
        medium: '320ms',
        slow: '550ms'
      },

      /* ===================================================== */
      /* KEYFRAMES */
      /* ===================================================== */

      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },

          '50%': {
            transform: 'translateY(-6px)'
          }
        },

        pulseGlow: {
          '0%, 100%': {
            opacity: '1'
          },

          '50%': {
            opacity: '.6'
          }
        },

        scan: {
          '0%': {
            transform: 'translateX(-100%)'
          },

          '100%': {
            transform: 'translateX(300%)'
          }
        }
      },

      animation: {
        float: 'float 6s ease-in-out infinite',

        'pulse-glow':
          'pulseGlow 2s ease-in-out infinite',

        scan: 'scan 4s linear infinite'
      }
    }
  },

  plugins: []
};
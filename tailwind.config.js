/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        background: {
          dark: '#090d16',
          light: '#f8fafc',
        },
        surface: {
          dark: '#1e293b',
          darker: '#131b2e',
          light: '#ffffff',
          card: '#1e293b',
        },
        text: {
          main: '#f8fafc',
          muted: '#94a3b8',
          subtle: '#64748b',
        },
        accent: {
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          cyan: '#06b6d4',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
        border: {
          dark: '#334155',
          light: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace', 'cursive'],
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'glow-accent': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'card-hover': '0 12px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(99, 102, 241, 0.2)',
      }
    },
  },
  plugins: [],
}

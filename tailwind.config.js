/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        deep: 'var(--bg-deep)',
        navy: 'var(--bg-navy)',
        glass: 'var(--glass)',
        muted: 'var(--text-muted)',
        yellow: {
          accent: 'var(--accent-yellow)',
        },
        risk: 'var(--risk-blue)',
        positive: 'var(--positive)',
      },
      fontFamily: {
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 28px rgba(0,0,0,0.28)',
        glow: '0 0 20px var(--accent-yellow-glow)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(110%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in': 'fade-in 0.25s ease-out',
        pulseRing: 'pulseRing 1.8s ease-out infinite',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent:    'var(--color-accent)',
        'theme-bg':   'var(--color-bg)',
        'theme-text': 'var(--color-text)',
        success:   'var(--color-success)',
        warning:   'var(--color-warning)',
        error:     'var(--color-error)',
        border:    'var(--color-border)',
        muted:     'var(--color-muted)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-mesh': 'radial-gradient(at 40% 20%, rgba(249,115,22,0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(251,191,36,0.10) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(249,115,22,0.07) 0px, transparent 50%)',
      },
      animation: {
        'float':          'float 7s ease-in-out infinite',
        'float-delayed':  'float-delayed 9s ease-in-out infinite 1.5s',
        'pulse-glow':     'pulse-glow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

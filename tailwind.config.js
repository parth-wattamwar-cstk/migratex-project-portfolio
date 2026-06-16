/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f6ef7',
        'primary-dark': '#3a58d4',
        'bg-base': '#0a0e1a',
        'bg-card': '#0f1626',
        'bg-card-alt': '#111827',
        'bg-element': '#1a2540',
        'bg-tag': '#1a2a44',
        'border-subtle': '#2a3860',
        'border-light': '#1e2d4a',
        'text-primary': '#ffffff',
        'text-secondary': '#8899bb',
        'text-muted': '#6b7fa3',
        'text-link': '#5599ee',
        'accent-green': '#22c55e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['28px', { lineHeight: '1.25', fontWeight: '800' }],
        'section': ['18px', { lineHeight: '1.4', fontWeight: '700' }],
      },
      maxWidth: {
        'container': '640px',
      },
      boxShadow: {
        'card': '0 2px 16px rgba(0,0,0,0.4)',
        'card-sm': '0 2px 12px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'glow': 'radial-gradient(ellipse at bottom left, rgba(30,60,180,0.25) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
};
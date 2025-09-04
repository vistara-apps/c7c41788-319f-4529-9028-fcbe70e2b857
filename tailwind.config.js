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
        background: 'hsl(220, 12%, 96%)',
        accent: 'hsl(34, 95%, 55%)',
        primary: 'hsl(222, 88%, 45%)',
        surface: 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(220, 13%, 18%)',
        'text-secondary': 'hsl(220, 13%, 38%)',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        xxl: '32px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220, 13%, 18%, 0.08)',
        modal: '0 12px 32px hsla(220, 13%, 18%, 0.16)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, hsl(222, 88%, 45%) 0%, hsl(34, 95%, 55%) 100%)',
        'gradient-surface': 'linear-gradient(135deg, hsl(0, 0%, 100%) 0%, hsl(220, 12%, 96%) 100%)',
      },
    },
  },
  plugins: [],
}

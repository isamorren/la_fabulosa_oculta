/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'border-border',
    'bg-background',
    'text-foreground',
    'bg-card',
    'text-card-foreground',
    'bg-muted',
    'text-muted-foreground',
    'bg-secondary',
    'text-secondary-foreground',
    'bg-primary',
    'text-primary',
    'text-primary-foreground',
    'border-primary',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

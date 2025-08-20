/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#2563eb',
        },
        success: {
          600: '#16a34a',
        },
        warning: {
          600: '#facc15',
        },
        danger: {
          600: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}


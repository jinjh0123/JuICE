import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1100px',
      }
    },
    extend: {
      fontFamily: {
        Nunito: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'screen-scroll': 'screenScrollUpDown 17s ease-in-out infinite'
      },
      keyframes: {
        screenScrollUpDown: {
          '0% 30%': {transform: 'translateY(0)'},
          '50%': {transform: "translateY(-33%)"},
          '70% 100%': {transform: 'translateY(0)'},
        } 
      }
    },
  },
  plugins: [],
};
export default config;

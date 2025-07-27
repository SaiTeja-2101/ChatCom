import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"var(--color-primary)",
        secondary:"var(--color-secondary)",
        background:"var(--color-background)",
        navbackground:"var(--color-navbackground)",
        sidebar:"var(--color-sidebar)",
        messagebg:"var(--color-messagebg)",
        text:"var(--color-text)",
        msghover:"var(--color-msghover)",
        profilebg:"var(--color-profilebg)",
        profiletextprimary:"var(--color-profiletextprimary)",
        profileacctbg:"var(--color-profileacctbg)",
        profileinfo:"var(--color-profileinfo)",
        inputicon:"var(--color-inputicon)",
        inputiconhover:"var(--color-inputiconhover)",
      },
      fontFamily: {
        sans: ["Geist", "Geist Fallback", "sans-serif"],
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark", 
      "cupcake",
      "bumblebee", 
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter"
    ],
  },
}
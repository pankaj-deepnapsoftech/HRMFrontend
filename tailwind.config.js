/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      xs: "375px", // Extra small devices (mobile)
      sm: "640px", // Small devices (tablets)
      md: "768px", // Medium devices (small laptops)
      lg: "1024px", // Large devices (laptops/desktops)
      xl: "1280px", // Extra large devices (desktops)
      "2xl": "1536px", // 2x Extra large devices
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
};

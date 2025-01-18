import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        volcanicBurst: '#FF4D03', 
        goldenGlow: '#FFE500',   
        blueLotus: '#5D4BF3',    
        lightIndigo: '#441B91',  
        algaeGreen: '#00E082',  
        candyBlush: '#DA39A9',   
        skySplash: '#00B0E7',    
        fireAmber: '#FFAC00',    
        pastelWave: '#FF75CD',   
        shadowGray: '#333333',
        lightGray: '#EAEAEA',
      },
    },
  },
  plugins: [],
} satisfies Config;

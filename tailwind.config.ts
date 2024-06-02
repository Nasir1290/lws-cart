import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './provider/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      screen: {
         sm: '576px',
         md: '768px',
         lg: '992px',
         xl: '1200px',
      },
      container: {
         center: true,
         padding: '1rem',
      },
      extend: {
         backgroundImage: {
            banner: "url('/assets/images/banner-bg.jpg')",
         },
         fontFamily: {
            poppins: ['var(--font-poppins)'],
            roboto: ['var(--font-roboto)'],
         },
         colors: {
            primary: '#fd3d57',
         },
      },
   },
   plugins: [require('@tailwindcss/forms')],
}
export default config

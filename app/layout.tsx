import type { Metadata } from 'next'

import './globals.css'

import AuthProvider from '@/provider/auth-provider'

import { poppins, roboto } from './fonts'

export const metadata: Metadata = {
   title: 'LWSKart - Your One-Stop Online Shop',
   description:
      'Discover a wide range of products at LWSKart. From electronics to fashion, home essentials to gadgets, we have it all. Shop now for great deals and fast delivery.',
   keywords:
      'online shopping, e-commerce, electronics, fashion, home essentials, gadgets, LWSKart, best deals, fast delivery',
}

interface Children {
   children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<Children>) {
   return (
      <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
         <body>
            <AuthProvider>{children}</AuthProvider>
         </body>
      </html>
   )
}

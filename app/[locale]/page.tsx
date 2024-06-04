import { Locale } from '@/types/i18n'
import { Metadata } from 'next'

import AdsCard from './components/ads-card'
import Features from './components/features'
import HeroBanner from './components/hero'
import NewArrival from './components/new-arrival'
import ShopByCategory from './components/shop-by-category'
import TrendingProducts from './components/trending-products'

interface Props {
   params: {
      locale: Locale
   }
}

export const metadata: Metadata = {
   title: 'LWSKart - Your One-Stop Online Shop',
   description:
      'Welcome to LWSKart, your ultimate destination for online shopping. Explore a vast selection of products ranging from electronics and fashion to home essentials and gadgets. Shop now for amazing deals and enjoy fast delivery!',
   keywords:
      'online shopping, e-commerce, electronics, fashion, home essentials, gadgets, LWSKart, best deals, fast delivery',
   openGraph: {
      type: 'website',
      url: 'https://shadhin-shop.vercel.app',
      title: 'LWSKart - Your One-Stop Online Shop',
      description:
         'Discover a wide range of products at LWSKart. From electronics to fashion, home essentials to gadgets, we have it all. Shop now for great deals and fast delivery.',
      images: [
         {
            url: 'https://shadhin-shop.vercel.app/assets/images/banner-bg.jpg',
            width: 800,
            height: 600,
            alt: 'LWSKart',
         },
      ],
   },
}

export default async function Home({ params: { locale } }: Props) {
   const bangla = await import('./components/bn.json')
   const english = await import('./components/en.json')
   const dict = locale === 'bn' ? bangla : english

   return (
      <>
         <HeroBanner dict={dict} />
         <Features dict={dict} />
         <ShopByCategory locale={locale} dict={dict} />
         <NewArrival locale={locale} dict={dict} />
         <AdsCard />
         <TrendingProducts locale={locale} dict={dict} />
      </>
   )
}

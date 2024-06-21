import { toggleCartlist } from '@/server-actions/toggle-cartlist'
import { toggleWishlist } from '@/server-actions/toggle-wishlist'
import { Locale } from '@/types/i18n'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

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
   searchParams: {
      action: string
      actionid: string
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

export default async function Home({
   params: { locale },
   searchParams: { action, actionid },
}: Props) {
   const bangla = await import('./components/bn.json')
   const english = await import('./components/en.json')
   const dict = locale === 'bn' ? bangla : english

   if (actionid) {
      if (action === 'add-to-cart') {
         await toggleCartlist({
            isInCart: false,
            locale,
            productId: actionid,
            path: `/${locale}`,
            quantity: 1,
         })
         redirect(`/${locale}`)
      }
      if (action === 'add-to-wishlist') {
         await toggleWishlist({
            isWishlisted: false,
            locale,
            productId: actionid,
            path: `/${locale}`,
         })
         redirect(`/${locale}`)
      }
   }

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

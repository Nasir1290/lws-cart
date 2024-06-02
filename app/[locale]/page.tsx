import { Locale } from '@/types/i18n'

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

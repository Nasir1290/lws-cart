import ProductCard from '@/components/product/product-card'
import { getNewArrivalProducts } from '@/server-actions/get-new-arrival'
import { Locale } from '@/types/i18n'
import { Lang_Home } from '@/types/lang/home'

interface Props {
   dict: Lang_Home
   locale: Locale
}

export default async function NewArrival({ locale, dict }: Props) {
   const products = await getNewArrivalProducts()

   return (
      <div className="container pb-16">
         <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
            {dict.newArrival.title}
         </h2>
         <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {products.map((product) => (
               <ProductCard
                  locale={locale}
                  key={product._id}
                  product={product}
               />
            ))}
         </div>
      </div>
   )
}

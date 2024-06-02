import ProductCard from '@/components/product/product-card'
import { Locale } from '@/types/i18n'
import { Lang_Product_Details } from '@/types/lang/product-details'
import { C_Product } from '@/types/product'

interface Props {
   locale: Locale
   products: C_Product[]
   dict: Lang_Product_Details
}

export default function RelatedProducts({ products, locale, dict }: Props) {
   return (
      <div className="container pb-16">
         <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
            {dict.relatedProducts}
         </h2>
         <div className="grid grid-cols-4 gap-6">
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

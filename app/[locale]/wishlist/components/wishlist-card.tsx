import { getCartlist } from '@/server-actions/get-cartlist'
import { Locale } from '@/types/i18n'
import { Lang_Wishlist } from '@/types/lang/wishlist'
import { Wishlist_Product } from '@/types/product'
import { convertNumEnToBn } from '@/utils/convertNumEnToBn'
import Image from 'next/image'
import Link from 'next/link'

import AddToCartForm from './add-to-cart-form'
import RemoveForm from './remove-form'

interface Props {
   product: Wishlist_Product
   locale: Locale
   dict: Lang_Wishlist
}

export default async function WishlistCard({ product, locale, dict }: Props) {
   const cartlistProducts = await getCartlist()
   const isInCart = cartlistProducts.some(
      (prod) => prod.product._id === product._id,
   )

   return (
      <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
         <div className="relative w-28 h-20">
            <Image
               fill
               src={product.images[0]}
               alt={product.name}
               className="object-cover object-center"
            />
         </div>
         <div className="w-1/3">
            <Link
               href={`/product-details/${product._id}`}
               className="text-gray-800 text-xl font-medium uppercase"
            >
               {product.name}
            </Link>
            <p className="text-gray-500 text-sm">
               {dict.availability}:{' '}
               <span
                  className={
                     product.stockQuantity > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                  }
               >
                  {product.stockQuantity > 0 ? dict.inStock : dict.outOfStock}
               </span>
            </p>
         </div>
         <div className="text-primary text-lg font-semibold">
            {dict.currency}
            {locale === 'bn' ? convertNumEnToBn(product.price) : product.price}
         </div>
         <AddToCartForm
            dict={dict}
            locale={locale}
            isInCart={isInCart}
            productId={product._id}
         />
         <RemoveForm locale={locale} productId={product._id} />
      </div>
   )
}

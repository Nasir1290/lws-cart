import { Locale } from '@/types/i18n'
import { Cartlist_Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'

import CartRemoveForm from './cart-remove-form'
import IncreDecreButton from './incre-decre-button'

interface Props {
   product: Cartlist_Product
   locale: Locale
}

export default function CartCard({ product, locale }: Props) {
   const discountPrice = (product.price * (100 - product.discount)) / 100

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
               href={`/${locale}/product-details/${product._id}`}
               className="text-gray-800 text-xl font-medium uppercase"
            >
               {product.name}
            </Link>
            <p className="text-gray-500 text-sm">
               Availability:{' '}
               <span
                  className={
                     product.stockQuantity > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                  }
               >
                  {product.stockQuantity > 0
                     ? `In Stock(${product.stockQuantity})`
                     : 'Out of Stock'}
               </span>
            </p>
         </div>
         <IncreDecreButton
            productId={product._id}
            quantity={product.quantity}
            stockQuantity={product.stockQuantity}
         />
         <div className="text-primary text-lg font-semibold">
            BDT {discountPrice}
         </div>
         <CartRemoveForm locale={locale} productId={product._id} />
      </div>
   )
}

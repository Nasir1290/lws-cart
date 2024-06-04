import { C_Cart } from '@/types/cart'
import { Locale } from '@/types/i18n'
import { Lang_Cart } from '@/types/lang/cart'
import { convertNumEnToBn } from '@/utils/convertNumEnToBn'
import Image from 'next/image'
import Link from 'next/link'

import CartRemoveForm from './cart-remove-form'
import ExpireTime from './expire-time'
import IncreDecreButton from './incre-decre-button'

interface Props {
   product: C_Cart
   locale: Locale
   dict: Lang_Cart
}

export default function CartCard({ product, locale, dict }: Props) {
   const discountPrice =
      (product.product.price * (100 - product.product.discount)) / 100

   return (
      <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
         <div className="relative w-28 h-20">
            <Image
               fill
               src={product.product.images[0]}
               alt={product.product.name}
               className="object-cover object-center"
            />
         </div>
         <div className="w-1/3">
            <Link
               href={`/${locale}/product-details/${product.product._id}`}
               className="text-gray-800 text-xl font-medium uppercase"
            >
               {product.product.name}
            </Link>
            <p className="text-gray-500 text-sm">
               {dict.availability}:{' '}
               <span
                  className={
                     product.product.stockQuantity > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                  }
               >
                  {product.product.stockQuantity > 0
                     ? `${dict.inStock}(${product.product.stockQuantity})`
                     : dict.outOfStock}
               </span>
            </p>
            <ExpireTime locale={locale} dict={dict} updatedAt={product.updatedAt} />
         </div>
         <IncreDecreButton
            cartId={product._id}
            productId={product.product._id}
            quantity={product.product.quantity}
         />
         <div className="text-primary text-lg font-semibold">
            {dict.currency}{' '}
            {locale === 'bn' ? convertNumEnToBn(discountPrice) : discountPrice}
         </div>
         <CartRemoveForm locale={locale} productId={product.product._id} />
      </div>
   )
}

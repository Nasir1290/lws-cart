import StarRating from '@/app/[locale]/product-details/components/star-rating'
import { getCartlist } from '@/server-actions/get-cartlist'
import { getWishlist } from '@/server-actions/get-wishlist'
import { getComments } from '@/server-actions/getComments'
import { Locale } from '@/types/i18n'
import { C_Product } from '@/types/product'
import { convertNumEnToBn } from '@/utils/convertNumEnToBn'
import { makeShort } from '@/utils/makeShort'
import Image from 'next/image'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'

import ProductCardAddToCart from './card-add-to-cart'
import ProductWishlistForm from './product-wishlist-form'

interface Props {
   product: C_Product
   locale: Locale
}

export default async function ProductCard({ product, locale }: Props) {
   const bangla = await import('./bn.json')
   const english = await import('./en.json')
   const dict = locale === 'bn' ? bangla : english

   const comments = await getComments({ productId: product._id })

   const wishlistProducts = await getWishlist()
   const isWishlisted = wishlistProducts.some(
      (prod) => prod._id === product._id,
   )

   const cartlistProducts = await getCartlist()

   const isInCart = cartlistProducts.some((prod) => prod.product._id === product._id)

   const discountPrice =
      product && (product?.price * (100 - product?.discount)) / 100

   return (
      <div className="group overflow-hidden rounded bg-white shadow">
         <div className="relative">
            <div className="relative h-[225px]">
               <Image
                  fill
                  src={product.images[0]}
                  alt={product.name}
                  className="object-cover"
               />
            </div>
            <div
               className="absolute inset-0 flex items-center justify-center gap-2 
   bg-black bg-opacity-40 opacity-0 transition group-hover:opacity-100"
            >
               <Link
                  href={`/${locale}/product-details/${product._id}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                  title="View Product"
               >
                  <FiSearch />
               </Link>
               <ProductWishlistForm
                  productId={product._id}
                  isWishlisted={isWishlisted}
               />
            </div>
         </div>
         <div className="px-4 pb-3 pt-4">
            <Link href={`/${locale}/product-details/${product._id}`}>
               <h4 className="mb-2 text-lg font-medium uppercase text-gray-800 transition hover:text-primary">
                  {makeShort(product.name, 20)}
               </h4>
            </Link>
            <div className="mb-1 flex items-baseline space-x-2">
               <p className="text-lg font-semibold text-primary">
                  {dict.currency}{' '}
                  {locale === 'bn'
                     ? convertNumEnToBn(Math.round(discountPrice))
                     : Math.round(discountPrice)}
               </p>
               <p className="text-sm text-gray-400 line-through">
                  {dict.currency}{' '}
                  {locale === 'bn'
                     ? convertNumEnToBn(Math.round(product.price))
                     : Math.round(product.price)}
               </p>
            </div>
            <div className="flex items-center">
               <StarRating comments={comments} />
               <div className="ml-3 text-xs text-gray-500">
                  (
                  {locale === 'bn'
                     ? convertNumEnToBn(comments.length)
                     : comments.length}
                  )
               </div>
            </div>
         </div>
         <ProductCardAddToCart
         stockQuantity={product.stockQuantity}
            locale={locale}
            dict={dict.default}
            isInCart={isInCart}
            productId={product._id}
         />
      </div>
   )
}

'use client'

import { toggleCartlist } from '@/server-actions/toggle-cartlist'
import { Locale } from '@/types/i18n'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

import AddToCartSubmit from './add-to-cart-submit'
import { Lang_Wishlist } from '@/types/lang/wishlist'

interface Props {
   productId: string
   isInCart: boolean
   locale: Locale
   dict:Lang_Wishlist
}

export default function AddToCartForm({ productId, isInCart, locale,dict }: Props) {
   const pathname = usePathname()
   const updateAction = toggleCartlist.bind(null, {
      path: pathname,
      locale,
      quantity: 1,
      productId,
      isInCart,
   })

   const clientAction = async () => {
      try {
         await updateAction()
         toast.success('Added to cart successfully')
      } catch (error: any) {
         toast.error(error?.message || 'Failed to add in cart')
      }
   }

   return (
      <form action={clientAction}>
         <AddToCartSubmit locale={locale} dict={dict} isInCart={isInCart} />
      </form>
   )
}

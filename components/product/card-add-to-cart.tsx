'use client'

import { toggleCartlist } from '@/server-actions/toggle-cartlist'
import { Locale } from '@/types/i18n'
import { Lang_ProductCard } from '@/types/lang/product-card'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

import CardAddtocartSubmit from './card-addtocart-submit'

interface Props {
   locale: Locale
   productId: string
   isInCart: boolean
   dict: Lang_ProductCard
}

export default function ProductCardAddToCart({
   productId,
   isInCart,
   dict,
   locale,
}: Props) {
   const { status } = useSession()
   const pathname = usePathname()

   const updateAction = toggleCartlist.bind(null, {
      path: pathname,
      quantity: 1,
      productId,
      isInCart,
      locale,
   })

   const clientAction = async () => {
      try {
         await updateAction()
         if (status === 'authenticated') {
            toast.success('Added to cart successfully')
         }
      } catch (error: any) {
         toast.error(error?.message || 'Failed to add in cart')
      }
   }

   return (
      <form action={clientAction}>
         <CardAddtocartSubmit dict={dict} isInCart={isInCart} />
      </form>
   )
}

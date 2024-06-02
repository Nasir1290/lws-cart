'use client'

import { toggleCartlist } from '@/server-actions/toggle-cartlist'
import { Locale } from '@/types/i18n'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

import CartDeleteSubmit from './cart-delete-submit'

interface Props {
   productId: string
   locale: Locale
}

export default function CartRemoveForm({ productId, locale }: Props) {
   const pathname = usePathname()
   const removeFromCart = toggleCartlist.bind(null, {
      path: pathname,
      locale,
      productId,
      isInCart: true,
      quantity: 1,
   })

   const handleAction = async () => {
      try {
         await removeFromCart()
         toast.success('Removed from cart')
      } catch (error) {
         toast.error('Failded to remove from cart')
      }
   }

   return (
      <form action={handleAction}>
         <CartDeleteSubmit />
      </form>
   )
}

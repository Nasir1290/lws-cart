'use client'

import { toggleCartlist } from '@/server-actions/toggle-cartlist'
import { Locale } from '@/types/i18n'
import { Lang_Product_Details } from '@/types/lang/product-details'
import { usePathname, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

import AddToCartSubmit from './add-to-cart-submit'

interface Props {
   productId: string
   isInCart: boolean
   locale: Locale
   dict: Lang_Product_Details
}

export default function AddToCartButton({
   productId,
   isInCart,
   locale,
   dict
}: Props) {
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const quantity = searchParams.get('quantity')

   const updateAction = toggleCartlist.bind(null, {
      quantity: Number(quantity),
      productId,
      isInCart,
      path: pathname,
      locale,
   })

   const clientAction = async () => {
      if (isInCart) {
         try {
            await updateAction()
            toast.success('Removed from cart')
         } catch (error: any) {
            toast.error(error?.message || 'Failed to remove')
         }
      } else {
         if (Number(quantity) > 0) {
            try {
               await updateAction()
               toast.success('Added to cart successfully')
            } catch (error: any) {
               toast.error(error?.message || 'Failed to add in cart')
            }
         } else {
            toast.error('Select product quantity')
         }
      }
   }

   return (
      <form action={clientAction}>
         <AddToCartSubmit dict={dict} isInCart={isInCart} />
      </form>
   )
}

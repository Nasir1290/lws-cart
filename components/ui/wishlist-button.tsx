'use client'

import { toggleWishlist } from '@/server-actions/toggle-wishlist'
import { Locale } from '@/types/i18n'
import { Lang_Product_Details } from '@/types/lang/product-details'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

import WishlistSubmit from './wishlist-submit'

interface Props {
   productId: string
   isWishlisted: boolean
   dict: Lang_Product_Details
   locale: Locale
}

export default function WishlistButton({
   productId,
   isWishlisted,
   dict,
   locale,
}: Props) {
   const path = usePathname()
   const updateToogleAction = toggleWishlist.bind(null, {
      locale,
      path,
      productId,
      isWishlisted,
   })

   const handleSubmit = async () => {
      try {
         await updateToogleAction()
         toast.success(
            isWishlisted ? 'Removed from wishlist' : 'Added to your wishlist',
         )
      } catch (error) {
         toast.error(
            isWishlisted
               ? 'Failded to remove from wishlist'
               : 'Failded to add in wishlist',
         )
      }
   }

   return (
      <form action={handleSubmit}>
         <WishlistSubmit dict={dict} isWishlisted={isWishlisted} />
      </form>
   )
}

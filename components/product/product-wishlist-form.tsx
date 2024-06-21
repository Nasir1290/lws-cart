'use client'

import { toggleWishlist } from '@/server-actions/toggle-wishlist'
import { Locale } from '@/types/i18n'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

import ProductWishlistSubmit from './product-wishlist-submit'

interface Props {
   isWishlisted: boolean
   productId: string
   locale: Locale
}

export default function ProductWishlistForm({
   isWishlisted,
   productId,
   locale,
}: Props) {
   const { status } = useSession()
   const path = usePathname()

   const updateToogleAction = toggleWishlist.bind(null, {
      productId,
      isWishlisted,
      path,
      locale,
   })

   const handleSubmit = async () => {
      try {
         await updateToogleAction()
         if (status === 'authenticated') {
            toast.success(
               isWishlisted
                  ? 'Removed from wishlist'
                  : 'Added to your wishlist',
            )
         }
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
         <ProductWishlistSubmit isWishlisted={isWishlisted} />
      </form>
   )
}

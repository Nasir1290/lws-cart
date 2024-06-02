'use client'

import { toggleWishlist } from '@/server-actions/toggle-wishlist'
import toast from 'react-hot-toast'

import ProductWishlistSubmit from './product-wishlist-submit'

interface Props {
   isWishlisted: boolean
   productId: string
}

export default function ProductWishlistForm({
   isWishlisted,
   productId,
}: Props) {
   const updateToogleAction = toggleWishlist.bind(null, {
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
         <ProductWishlistSubmit isWishlisted={isWishlisted} />
      </form>
   )
}

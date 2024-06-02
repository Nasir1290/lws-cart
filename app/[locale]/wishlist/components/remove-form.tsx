'use client'

import WishlistDeleteButton from '@/components/ui/wishlist-del-button'
import { toggleWishlist } from '@/server-actions/toggle-wishlist'
import toast from 'react-hot-toast'

interface Props {
   productId: string
}

export default function RemoveForm({ productId }: Props) {
   const removeFromWishlist = toggleWishlist.bind(null, {
      productId,
      isWishlisted: true,
   })

   const handleAction = async () => {
      try {
         await removeFromWishlist()
         toast.success('Removed from wishlist')
      } catch (error) {
         toast.error('Failded to remove from wishlist')
      }
   }

   return (
      <form action={handleAction}>
         <WishlistDeleteButton />
      </form>
   )
}

'use client'

import WishlistDeleteButton from '@/components/ui/wishlist-del-button'
import { toggleWishlist } from '@/server-actions/toggle-wishlist'
import { Locale } from '@/types/i18n'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

interface Props {
   productId: string
   locale: Locale
}

export default function RemoveForm({ productId, locale }: Props) {
   const path = usePathname()
   const removeFromWishlist = toggleWishlist.bind(null, {
      path,
      locale,
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

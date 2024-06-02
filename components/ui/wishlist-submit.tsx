import { Lang_Product_Details } from '@/types/lang/product-details'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { FaHeart } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'

interface Props {
   isWishlisted: boolean
   dict: Lang_Product_Details
}

export default function WishlistSubmit({ isWishlisted, dict }: Props) {
   const { pending } = useFormStatus()

   return (
      <button
         disabled={pending}
         type="submit"
         className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
      >
         {pending ? (
            <ImSpinner2 className="animate-spin" />
         ) : (
            <FaHeart className={isWishlisted ? 'text-red-500' : ''} />
         )}
         {pending
            ? isWishlisted
               ? dict.removing
               : dict.adding
            : isWishlisted
              ? dict.removeFromWishlist
              : dict.addToWishlist}
      </button>
   )
}

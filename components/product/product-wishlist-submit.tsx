import { useFormStatus } from 'react-dom'
import { FaHeart } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'

interface Props {
   isWishlisted: boolean
}

export default function ProductWishlistSubmit({ isWishlisted }: Props) {
   const { pending } = useFormStatus()

   return (
      <button
         type="submit"
         className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-white transition bg-gray-800"
         title="Add To Wishlist"
      >
         {pending ? (
            <ImSpinner2 className="animate-spin text-primary" />
         ) : (
            <FaHeart className={isWishlisted ? 'text-green-500' : ''} />
         )}
      </button>
   )
}

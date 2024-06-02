import { Lang_Product_Details } from '@/types/lang/product-details'
import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from 'react-icons/im'
import { LuShoppingCart } from 'react-icons/lu'

interface Props {
   dict: Lang_Product_Details
   isInCart: boolean
}

export default function AddToCartSubmit({ isInCart, dict }: Props) {
   const { pending } = useFormStatus()

   return (
      <button
         disabled={pending}
         type="submit"
         className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
      >
         {pending ? (
            <ImSpinner2 className="animate-spin" />
         ) : (
            <LuShoppingCart className="text-xl" />
         )}
         {pending
            ? isInCart
               ? dict.removing
               : dict.adding
            : isInCart
              ? dict.removeFromCart
              : dict.addToCart}
      </button>
   )
}

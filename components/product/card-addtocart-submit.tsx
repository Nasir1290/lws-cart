import { Lang_ProductCard } from '@/types/lang/product-card'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from 'react-icons/im'

interface Props {
   isInCart: boolean
   dict: Lang_ProductCard
   stockQuantity: number
}

export default function CardAddtocartSubmit({
   isInCart,
   dict,
   stockQuantity,
}: Props) {
   const { pending } = useFormStatus()

   return isInCart ? (
      <Link
         href={'/cart'}
         className={`block w-full rounded-b border py-1 text-center text-white transition hover:bg-transparent  ${isInCart ? 'bg-green-500 border-green-500 hover:text-green-500' : 'border-primary bg-primary hover:text-primary'}`}
      >
         {dict.viewInCart}
      </Link>
   ) : stockQuantity > 0 ? (
      <button
         disabled={pending}
         type="submit"
         className="w-full rounded-b border border-primary bg-primary py-1  text-white transition hover:bg-transparent hover:text-primary flex items-center justify-center gap-2"
      >
         {pending && <ImSpinner2 className="animate-spin" />}
         {pending ? dict.adding : dict.addToCart}
      </button>
   ) : (
      <button
         disabled
         type="button"
         className="w-full rounded-b border border-gray-400 bg-gray-400 py-1  text-white transition hover:bg-transparent hover:text-gray-400 flex items-center justify-center gap-2"
      >
         {dict.outOfStock}
      </button>
   )
}

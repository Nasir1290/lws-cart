import { Locale } from '@/types/i18n'
import { Lang_Wishlist } from '@/types/lang/wishlist'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from 'react-icons/im'

export default function AddToCartSubmit({
   isInCart,
   dict,
   locale,
}: {
   isInCart: boolean
   dict: Lang_Wishlist
   locale: Locale
}) {
   const { pending } = useFormStatus()
   return isInCart ? (
      <Link
         href={`/${locale}/cart`}
         className={`px-6 py-2 text-center text-sm text-white border rounded hover:bg-transparent transition uppercase font-roboto font-medium ${isInCart ? 'bg-green-500 border-green-500 hover:text-green-500' : 'border-primary bg-primary hover:text-primary'}`}
      >
         {dict.viewInCart}
      </Link>
   ) : (
      <button
         type="submit"
         className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium flex items-center justify-center gap-2"
      >
         {pending && <ImSpinner2 className="animate-spin" />}
         {pending ? dict.adding : dict.addToCart}
      </button>
   )
}

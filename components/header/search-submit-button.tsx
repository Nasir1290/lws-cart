import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from 'react-icons/im'

interface Props {
   dict: {
      search: string
      placeholder: string
      account: string
      cart: string
      wishlist: string
   }
}

export default function SearchSubmitButton({ dict }: Props) {
   const { pending } = useFormStatus()

   return (
      <button
         type="submit"
         disabled={pending}
         className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition"
      >
         {pending ? (
            <ImSpinner2 className="animate-spin text-2xl" />
         ) : (
            dict.search
         )}
      </button>
   )
}

import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from 'react-icons/im'
import { IoLogOutOutline } from 'react-icons/io5'

export default function LogoutSubmitButton({ dict }: { dict: string }) {
   const { pending } = useFormStatus()

   return (
      <button
         disabled={pending}
         type="submit"
         className="flex items-center gap-x-2 px-4 py-2 rounded-md bg-primary text-white text-sm mt-2"
      >
         {pending ? (
            <>
               <ImSpinner2 className="animate-spin text-lg" />
               <span>Loading...</span>
            </>
         ) : (
            <>
               <span>{dict}</span>
               <IoLogOutOutline className="text-lg" />
            </>
         )}
      </button>
   )
}

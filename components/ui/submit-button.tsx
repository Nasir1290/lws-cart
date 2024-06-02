'use client'

import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from 'react-icons/im'

interface Props {
   title: string
   pendingMsg: string
}

export default function SubmitButton({ title, pendingMsg }: Props) {
   const { pending } = useFormStatus()

   return (
      <button
         disabled={pending}
         type="submit"
         className={`flex justify-center items-center w-full py-2 text-center text-white  border  rounded gap-2 transition uppercase font-roboto font-medium ${pending ? 'bg-gray-400 border-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-transparent hover:text-primary border-primary'}`}
      >
         {pending ? (
            <>
               <ImSpinner2 className="animate-spin text-2xl" />
               {pendingMsg}
            </>
         ) : (
            title
         )}
      </button>
   )
}

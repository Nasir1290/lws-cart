import React from 'react'
import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from 'react-icons/im'

export default function ResetSubmit() {
   const { pending } = useFormStatus()

   return (
      <button
         disabled={pending}
         type="submit"
         className="bg-primary hover:border-primary border-transparent hover:text-primary border hover:bg-white transition-all text-white w-full py-2 rounded mt-4"
      >
         {pending ? (
            <ImSpinner2 className="animate-spin text-xl" />
         ) : (
            'Reset All'
         )}
      </button>
   )
}

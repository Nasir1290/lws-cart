'use client'

import { useFormStatus } from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'

export default function CartDeleteSubmit() {
   const { pending } = useFormStatus()

   return (
      <button
         type="submit"
         className="text-gray-600 cursor-pointer hover:text-primary"
      >
         {pending ? <ImSpinner2 className="animate-spin" /> : <FaTrash />}
      </button>
   )
}

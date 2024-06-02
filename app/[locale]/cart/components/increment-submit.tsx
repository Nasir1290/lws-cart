import { useFormStatus } from 'react-dom'
import { FaPlus } from 'react-icons/fa6'
import { ImSpinner2 } from 'react-icons/im'

export default function IncrementSubmit() {
   const { pending } = useFormStatus()

   return (
      <button type="submit" className="flex items-center gap-2">
         {pending ? <ImSpinner2 className="animate-spin" /> : <FaPlus />}
      </button>
   )
}

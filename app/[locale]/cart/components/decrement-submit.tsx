import { useFormStatus } from 'react-dom'
import { FaMinus } from 'react-icons/fa6'
import { ImSpinner2 } from 'react-icons/im'

export default function DecrementSubmit() {
   const { pending } = useFormStatus()

   return (
      <button type="submit" className="flex items-center gap-2">
         {pending ? <ImSpinner2 className="animate-spin" /> : <FaMinus />}
      </button>
   )
}

import { ImSpinner2 } from 'react-icons/im'

export default function Loading() {
   return (
      <div className="min-h-[calc(100vh-129.6px)] flex justify-center items-center">
         <ImSpinner2 className="animate-spin text-5xl text-primary" />
      </div>
   )
}

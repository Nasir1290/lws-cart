export default function FormError({ message }: { message?: string }) {
   return (
      message && (
         <div>
            <p className="text-red-500 text-sm mt-1 font-medium bg-red-500/10 p-4 rounded">
               {message}
            </p>
         </div>
      )
   )
}

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'
import toast from 'react-hot-toast'

export default function PrizeRange() {
   const searchParams = useSearchParams()
   const pathname = usePathname()
   const router = useRouter()

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isNaN(Number(e.target.value))) {
         const params = new URLSearchParams(searchParams.toString())
         if (e.target.name === 'min_price') {
            if (e.target.value) {
               params.set('min_price', e.target.value)
            } else params.delete('min_price')
         } else if (e.target.name === 'max_price') {
            if (e.target.value) {
               params.set('max_price', e.target.value)
            } else params.delete('max_price')
         }
         router.push(`${pathname}?${params.toString()}`)
      } else {
         toast.error('Please enter number')
      }
   }

   return (
      <div className="pt-4">
         <h3 className="text-gray-800 mb-3 uppercase font-medium">Price</h3>
         <div className="mt-4 flex items-center">
            <input
               type="text"
               name="min_price"
               id="min"
               defaultValue={searchParams.get('min_price') || ''}
               className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
               placeholder="min"
               onChange={handleChange}
            />
            <span className="mx-3 text-gray-500">-</span>
            <input
               type="text"
               name="max_price"
               id="max"
               defaultValue={searchParams.get('max_price') || ''}
               className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
               placeholder="max"
               onChange={handleChange}
            />
         </div>
      </div>
   )
}

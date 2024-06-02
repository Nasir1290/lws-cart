'use client'

import { Lang_Product_Details } from '@/types/lang/product-details'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
   stockQuantity?: number
   isInCart: boolean
   dict: Lang_Product_Details
}

export default function QuantityButton({
   stockQuantity = 0,
   isInCart,
   dict,
}: Props) {
   const [quantity, setQuantity] = useState<number>(0)

   const handleIncrement = () => {
      if (quantity < stockQuantity) {
         setQuantity((pre) => pre + 1)
         const params = new URLSearchParams()
         params.set('quantity', `${quantity + 1}`)
         window.history.pushState(null, '', `?${params.toString()}`)
      } else {
         toast.error(`The available quantity has been exceeded.`)
      }
   }

   const handleDecrement = () => {
      if (quantity > 1) {
         setQuantity((pre) => pre - 1)
         const params = new URLSearchParams()
         params.set('quantity', `${quantity - 1}`)
         window.history.pushState(null, '', `?${params.toString()}`)
      } else {
         toast.error(`The minimum quantity is 1.`)
      }
   }

   useEffect(() => {
      const params = new URLSearchParams()
      params.delete('quantity')
      window.history.pushState(null, '', `?${params.toString()}`)
   }, [])

   return (
      <div className="mt-4">
         <h3 className="text-sm text-gray-800 uppercase mb-1">
            {dict.quantity}
         </h3>
         <div
            className={`flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max ${isInCart ? 'opacity-50 cursor-not-allowed' : ''}`}
         >
            <button
               disabled={isInCart}
               onClick={handleDecrement}
               className={`h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none ${isInCart ? 'cursor-not-allowed pointer-events-none' : ''}`}
            >
               -
            </button>
            <div className="h-8 w-8 text-base flex items-center justify-center">
               {quantity}
            </div>
            <button
               disabled={isInCart}
               onClick={handleIncrement}
               className={`h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none ${isInCart ? 'cursor-not-allowed pointer-events-none' : ''}`}
            >
               +
            </button>
         </div>
      </div>
   )
}

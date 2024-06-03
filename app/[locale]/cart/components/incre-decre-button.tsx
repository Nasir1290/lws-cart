'use client'

import { incrementDecrement } from '@/server-actions/increment-decrement'
import toast from 'react-hot-toast'

import DecrementSubmit from './decrement-submit'
import IncrementSubmit from './increment-submit'

interface Props {
   quantity: number
   productId: string
   cartId: string
}

export default function IncreDecreButton({
   quantity,
   productId,
   cartId,
}: Props) {
   const handleIncrement = async () => {
      try {
         await incrementDecrement
            .bind(null, { action: 'increment', productId, cartId })
            .call(null)
      } catch (error: any) {
         toast.error(error?.message || 'Failed to add quantity')
      }
   }

   const handleDecrement = async () => {
      if (quantity > 1) {
         try {
            await incrementDecrement
               .bind(null, { action: 'decrement', productId, cartId })
               .call(null)
         } catch (error: any) {
            toast.error(error?.message || 'Failed to remove quantity')
         }
      } else {
         toast.error('The minimum quantity is 1.')
      }
   }

   return (
      <div className="flex items-center gap-4 border py-2 px-4 bg-slate-50 rounded">
         <form action={handleDecrement}>
            <DecrementSubmit />
         </form>
         <span>{quantity}</span>
         <form action={handleIncrement}>
            <IncrementSubmit />
         </form>
      </div>
   )
}

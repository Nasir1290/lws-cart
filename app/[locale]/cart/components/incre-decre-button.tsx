'use client'

import { incrementDecrement } from '@/server-actions/increment-decrement'
import toast from 'react-hot-toast'

import DecrementSubmit from './decrement-submit'
import IncrementSubmit from './increment-submit'

interface Props {
   quantity: number
   stockQuantity: number
   productId: string
}

export default function IncreDecreButton({
   quantity,
   stockQuantity,
   productId,
}: Props) {
   const handleIncrement = async () => {
      if (stockQuantity > quantity) {
         try {
            await incrementDecrement
               .bind(null, { action: 'increment', productId })
               .call(null)
         } catch (error: any) {
            toast.error(error?.message || 'Failed to add quantity')
         }
      } else {
         toast.error('The available quantity has been exceeded.')
      }
   }

   const handleDecrement = async () => {
      if (quantity > 1) {
         try {
            await incrementDecrement
               .bind(null, { action: 'decrement', productId })
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

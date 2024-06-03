'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { Cart } from '@/models/cart'
import { Product } from '@/models/product'
import { revalidatePath } from 'next/cache'

import { getSingleProduct } from './get-single-product'

interface Props {
   action: 'increment' | 'decrement'
   cartId: string
   productId: string
}

export const incrementDecrement = async ({
   action,
   cartId,
   productId,
}: Props) => {
   const session = await auth()
   if (!session?.user) throw new Error('Your session ended')

   try {
      await mongoConnect()
      const product = await getSingleProduct(productId)
      if (
         (action === 'increment' &&
            product?.stockQuantity &&
            product.stockQuantity > 0) ||
         action === 'decrement'
      ) {
         await Cart.findByIdAndUpdate(cartId, {
            $inc: { quantity: action === 'increment' ? 1 : -1 },
         })
         await Product.findByIdAndUpdate(productId, {
            $inc: {
               stockQuantity: action === 'increment' ? -1 : 1,
            },
         })
      } else {
         throw new Error('Stock Quantity Exceeded!')
      }
   } catch (error: any) {
      console.log(error)
      throw new Error(
         error?.message || 'The server is currently not responding!',
      )
   }

   revalidatePath('/cart')
}

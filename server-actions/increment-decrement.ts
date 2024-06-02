'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { User } from '@/models/user'
import { revalidatePath } from 'next/cache'

interface Props {
   action: 'increment' | 'decrement'
   productId: string
}

export const incrementDecrement = async ({ action, productId }: Props) => {
   const session = await auth()
   await mongoConnect()
   // const product = await getSingleProduct(productId)
   if (action === 'increment') {
      await User.findOneAndUpdate(
         { email: session?.user?.email, 'cart.productId': productId },
         { $inc: { 'cart.$.quantity': 1 } },
      ).lean()
   } else if (action === 'decrement') {
      await User.findOneAndUpdate(
         { email: session?.user?.email, 'cart.productId': productId },
         { $inc: { 'cart.$.quantity': -1 } },
      ).lean()
   }
   revalidatePath('/cart')
}

'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { User } from '@/models/user'
import { Order } from '@/types/order'
import { Types } from 'mongoose'

interface Res {
   _id: Types.ObjectId
   order: Order[]
}

export const getSingleOrder = async (orderId: string) => {
   const session = await auth()
   if (!session?.user) throw new Error('Your session expired!')
   try {
      await mongoConnect()
      const order: Res | null = await User.findOne(
         {
            email: session.user.email,
            'order._id': orderId,
         },
         { 'order.$': 1 },
      ).lean()

      if (order) {
         return { ...order.order[0], _id: order.order[0]._id.toString() }
      } else {
         throw new Error('Not Found')
      }
   } catch (error: any) {
      throw new Error(error?.message || 'Internal Server Error')
   }
}

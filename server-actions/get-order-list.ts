'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { User } from '@/models/user'
import { T_User } from '@/types/user'

export const getOrderList = async () => {
   const session = await auth()
   if (!session?.user) throw new Error('Your session expired!')

   try {
      await mongoConnect()
      const user: T_User | null = await User.findOne({
         email: session.user.email,
      }).lean()
      if (user) {
         const orders = user.order?.map((order) => ({
            ...order,
            _id: order._id.toString(),
         }))
         return orders ? orders : []
      } else {
         throw new Error('User not found')
      }
   } catch (error) {
      console.log(error)
   }
}

'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { Cart } from '@/models/cart'
import { User } from '@/models/user'
import { Res_Cart } from '@/types/cart'
import { MongooseError } from 'mongoose'

export const getCartlist = async () => {
   const session = await auth()
   if (!session?.user) return []
   try {
      await mongoConnect()
      const userId = await User.exists({
         email: session?.user.email,
      })
      const cartList: Res_Cart[] = await Cart.find({ userId })
         .populate({
            path: 'productId',
            select: '_id name stockQuantity price discount images',
         })
         .lean()
      if (cartList.length > 0) {
         const products = cartList.map((item) => ({
            _id: item._id.toString(),
            userId: item.userId.toString(),
            product: {
               ...item.productId,
               _id: item.productId._id.toString(),
               quantity: item.quantity,
            },
            updatedAt: item.updatedAt,
         }))
         return products
      } else return []
   } catch (error) {
      if (error instanceof MongooseError) {
         throw new Error('Check your connection & refresh')
      } else return []
   }
}

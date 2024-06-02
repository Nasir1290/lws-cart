'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { User } from '@/models/user'
import { Cartlist_Product, Wishlist_Product } from '@/types/product'

export type UserType = {
   name: string
   email: string
   password: string
   wishlist?: Wishlist_Product[]
   cart?: {
      productId: Wishlist_Product
      quantity: number
   }[]
}

export const getCartlist = async () => {
   const session = await auth()
   if (!session?.user) return []
   try {
      await mongoConnect()
      const user: UserType | null = await User.findOne({
         email: session?.user.email,
      })
         .populate({
            path: 'cart.productId',
            select: '_id name stockQuantity price discount images',
         })
         .lean()
      if (user?.cart) {
         const products: Cartlist_Product[] = user.cart.map(
            ({ productId, quantity }) => ({
               ...productId,
               quantity,
               _id: productId._id.toString(),
            }),
         )
         return products
      } else return []
   } catch (error) {
      return []
   }
}

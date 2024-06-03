'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { User } from '@/models/user'
import { Wishlist_Product } from '@/types/product'
import { MongooseError } from 'mongoose'

import { UserType } from './get-cartlist'

export const getWishlist = async () => {
   const session = await auth()
   if (!session?.user) return []
   try {
      await mongoConnect()
      const user: UserType | null = await User.findOne({
         email: session?.user.email,
      })
         .populate({
            path: 'wishlist',
            select: '_id name stockQuantity price discount images',
         })
         .lean()
      if (user?.wishlist) {
         const products: Wishlist_Product[] = user.wishlist.map((product) => ({
            ...product,
            _id: product._id.toString(),
         }))
         return products
      } else return []
   } catch (error) {
      if (error instanceof MongooseError) {
         throw new Error('Check your connection & refresh')
      } else return []
   }
}

'use server'

import { mongoConnect } from '@/db/mongo-connect'
import { Product } from '@/models/product'
import { T_Product } from '@/types/product'

export const getSingleProduct = async (productId: string) => {
   await mongoConnect()
   const buffer: T_Product | null = await Product.findById(productId).lean()
   if (buffer) {
      return { ...buffer, _id: buffer._id.toString() }
   }
}

'use server'

import { mongoConnect } from '@/db/mongo-connect'
import { Product } from '@/models/product'
import { T_Product } from '@/types/product'
import { notFound } from 'next/navigation'

export const getSingleProduct = async (productId: string) => {
   try {
      await mongoConnect()
      const buffer: T_Product | null = await Product.findById(productId).lean()
      if (buffer) {
         return { ...buffer, _id: buffer._id.toString() }
      } else notFound()
   } catch (error) {
      notFound()
   }
}

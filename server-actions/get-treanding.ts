'use server'

import { mongoConnect } from '@/db/mongo-connect'
import { Product } from '@/models/product'
import { T_Product } from '@/types/product'
import { objectIdToString } from '@/utils/objectIdToString'

export const getTrendingProducts = async () => {
   try {
      await mongoConnect()
      const buffer: T_Product[] = await Product.find()
         .sort({ unitsSold: -1 })
         .limit(8)
         .lean()
      return objectIdToString(buffer)
   } catch (error) {
      console.log(error)
      return []
   }
}

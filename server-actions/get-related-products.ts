'use server'

import { mongoConnect } from '@/db/mongo-connect'
import { Product } from '@/models/product'
import { T_Product } from '@/types/product'
import { objectIdToString } from '@/utils/objectIdToString'
import { Types } from 'mongoose'

export const getRelatedProducts = async (tags: string[], productId: string) => {
   await mongoConnect()
   const buffer: T_Product[] = await Product.find({
      _id: { $ne: new Types.ObjectId(productId) },
      tags: { $in: tags },
   })
      .limit(8)
      .lean()
   return objectIdToString(buffer)
}

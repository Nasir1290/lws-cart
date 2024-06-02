'use server'

import { mongoConnect } from '@/db/mongo-connect'
import { Product } from '@/models/product'
import { T_Product } from '@/types/product'
import { objectIdToString } from '@/utils/objectIdToString'

export const getNewArrivalProducts = async () => {
   try {
      await mongoConnect()
      const daysAgo = new Date(
         Date.now() - parseInt(process.env.DAYS_AGO!) * 24 * 60 * 60 * 1000,
      )

      const buffer: T_Product[] = await Product.find().limit(8).lean()

      const products = buffer.filter((product) => {
         return new Date(product.launchDate) >= daysAgo
      })
      return objectIdToString(products)
   } catch (error) {
      console.error(error)
      return []
   }
}

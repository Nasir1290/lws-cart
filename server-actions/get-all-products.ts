'use server'

import { mongoConnect } from '@/db/mongo-connect'
import { Product } from '@/models/product'
import { T_Product } from '@/types/product'
import { objectIdToString } from '@/utils/objectIdToString'

interface Props {
   category?: string | string[]
   color?: string | string[]
   min_price?: string
   max_price?: string
   query?: string
}

export const getAllProducts = async ({
   query,
   category,
   color,
   max_price,
   min_price,
}: Props) => {
   try {
      await mongoConnect()

      const dbQuery: any = {}

      if (query) {
         const searchRegex = new RegExp(query, 'i')
         dbQuery.$or = [
            { name: searchRegex },
            { category: searchRegex },
            { tags: searchRegex },
         ]
      }

      if (category) {
         if (Array.isArray(category)) {
            dbQuery.category = { $in: category.map((c) => new RegExp(c, 'i')) }
         } else {
            dbQuery.category = new RegExp(category, 'i')
         }
      }

      if (color) {
         if (Array.isArray(color)) {
            dbQuery.color = { $in: color.map((c) => new RegExp(c, 'i')) }
         } else {
            dbQuery.color = new RegExp(color, 'i')
         }
      }

      if (min_price) {
         dbQuery.price = { ...dbQuery.price, $gte: Number(min_price) }
      }

      if (max_price) {
         dbQuery.price = { ...dbQuery.price, $lte: Number(max_price) }
      }

      const products: T_Product[] = await Product.find(dbQuery).lean()

      return objectIdToString(products)
   } catch (error) {
      return []
   }
}

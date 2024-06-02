'use server'

import { mongoConnect } from '@/db/mongo-connect'
import { Categorie } from '@/models/category'
import { Res_Category } from '@/types/category'

export const getCategories = async () => {
   try {
      await mongoConnect()
      const categories: Res_Category[] = await Categorie.find().lean()
      return categories.map((category) => ({
         ...category,
         _id: category._id.toString(),
      }))
   } catch (error) {
      console.log(error)
   }
}

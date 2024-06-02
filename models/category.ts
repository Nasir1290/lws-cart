import { Category } from '@/types/category'
import { model, models, Schema } from 'mongoose'

const schema = new Schema<Category>(
   {
      category: {
         type: String,
         required: true,
      },
      thumbnail: {
         type: String,
         required: true,
      },
      href: {
         type: String,
         required: true,
      },
   },
   { timestamps: true },
)

export const Categorie =
   models.Categorie || model<Category>('Categorie', schema)

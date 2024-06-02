import { T_Product } from '@/types/product'
import { model, models, Schema } from 'mongoose'

const schema = new Schema<T_Product>({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   features: {
      type: [String],
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   discount: {
      type: Number,
      required: true,
   },
   category: {
      type: String,
      required: true,
   },
   brand: {
      type: String,
      required: true,
   },
   model: {
      type: String,
      required: true,
   },
   color: {
      type: String,
      required: true,
   },
   tags: {
      type: [String],
      required: true,
   },
   stockQuantity: {
      type: Number,
      required: true,
   },
   unitsSold: {
      type: Number,
      required: true,
   },
   launchDate: {
      type: Date,
      required: true,
   },
   images: {
      type: [String],
      required: true,
   },
})

export const Product = models.Product || model<T_Product>('Product', schema)

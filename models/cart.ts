import { T_Cart } from '@/types/cart'
import { model, models, Schema } from 'mongoose'

const schema = new Schema<T_Cart>(
   {
      userId: { type: Schema.ObjectId, ref: 'User' },
      productId: { type: Schema.ObjectId, ref: 'Product' },
      quantity: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true },
)

export const Cart = models.Cart || model<T_Cart>('Cart', schema)

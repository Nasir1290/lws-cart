import { Address } from '@/types/address'
import { Cartlist_Product } from '@/types/product'
import { T_User } from '@/types/user'
import { model, models, Schema, Types } from 'mongoose'

const addressSchema = new Schema<Address>({
   firstName: String,
   lastName: String,
   region: String,
   address: String,
   city: String,
   phone: String,
   email: String,
})

const orderedProductSchema = new Schema<Cartlist_Product>({
   _id: String,
   quantity: Number,
   name: String,
   stockQuantity: Number,
   price: Number,
   discount: Number,
   images: [String],
})

const schema = new Schema<T_User>(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      wishlist: [{ type: Types.ObjectId, ref: 'Product' }],
      address: {
         shippingAddress: addressSchema,
         billingAddress: addressSchema,
      },
      order: [
         {
            products: [orderedProductSchema],
            shippingAddress: addressSchema,
            invoice: String,
            createdAt: Date,
         },
      ],
   },
   { timestamps: true },
)

export const User = models.User || model<T_User>('User', schema)

import { Types } from 'mongoose'

export type T_Cart = {
   userId: Types.ObjectId
   productId: Types.ObjectId
   quantity: number
}

export type Res_Cart = {
   _id: Types.ObjectId
   userId: Types.ObjectId
   productId: {
      _id: Types.ObjectId
      name: string
      stockQuantity: number
      price: number
      discount: number
      images: string[]
   }
   quantity: number
   createdAt: string
   updatedAt: string
}

export type C_Cart = {
   _id: string
   userId: string
   product: {
      _id: string
      quantity: number
      name: string
      stockQuantity: number
      price: number
      discount: number
      images: string[]
   }
   updatedAt: string
}

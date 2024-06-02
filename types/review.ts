import { Types } from 'mongoose'

export type T_Review = {
   reviewerId: Types.ObjectId
   productId: Types.ObjectId
   rating: number
   comment: string
}

export type Res_Review = {
   _id: Types.ObjectId
   reviewerId: {
      name: string
      image: string
   }
   productId: Types.ObjectId
   rating: number
   comment: string
   createdAt: Date
   updatedAt: Date
}

export type C_Review = {
   _id: string
   reviewerId: {
      name: string
      image: string
   }
   productId: string
   rating: number
   comment: string
   createdAt: Date
   updatedAt: Date
}

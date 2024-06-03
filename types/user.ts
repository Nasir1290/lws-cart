import { Types } from 'mongoose'

import { Address } from './address'
import { Order } from './order'

export type T_User = {
   name: string
   email: string
   password: string
   wishlist?: Types.ObjectId[]
   address?: {
      shippingAddress: Address
      billingAddress: Address
   }
   order?: Order[]
}

export type Res_User = {
   _id: Types.ObjectId
   name: string
   email: string
   password: string
   wishlist?: Types.ObjectId[]
   address?: {
      shippingAddress: Address
      billingAddress: Address
   }
   order?: Order[]
}

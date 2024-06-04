import { Types } from 'mongoose'

import { Address } from './address'
import { Order } from './order'
import { Wishlist_Product } from './product'

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

export type Res_Populate_Wishlist = {
   _id: Types.ObjectId
   name: string
   email: string
   password: string
   wishlist?: Wishlist_Product[]
   address?: {
      shippingAddress: Address
      billingAddress: Address
   }
   order?: Order[]
}

import { Types } from 'mongoose'

import { Address } from './address'
import { Order } from './order'

export type T_User = {
   name: string
   email: string
   password: string
   wishlist?: Types.ObjectId[]
   cart?: {
      productId: Types.ObjectId
      quantity: number
   }[]
   address?: {
      shippingAddress: Address
      billingAddress: Address
   }
   order?: Order[]
}

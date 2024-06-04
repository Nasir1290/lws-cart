import { Types } from 'mongoose'

import { Address } from './address'
import { Cartlist_Product } from './product'

export type Order = {
   _id: Types.ObjectId
   products: Cartlist_Product[]
   shippingAddress: Address
   invoice: string
   createdAt: string
}

export type C_Order = {
   _id: string
   products: Cartlist_Product[]
   shippingAddress: Address
   invoice: string
   createdAt: string
}

export type PDF_Order = {
   products: Cartlist_Product[]
   shippingAddress: Address
   invoice: string
   createdAt: string
}

export type PDF_JSX_Order = {
   products: {
      productId: string
      _id: string
      quantity: number
      name: string
      stockQuantity: number
      price: number
      discount: number
      images: string[]
   }[]
   shippingAddress: Address
   invoice: string
   createdAt: string
}

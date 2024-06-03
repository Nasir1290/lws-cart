import { Types } from 'mongoose'

export type T_Product = {
   _id: Types.ObjectId
   name: string
   description: string
   features: string[]
   price: number
   discount: number
   category: string
   brand: string
   model: string
   color: string
   tags: string[]
   stockQuantity: number
   unitsSold: number
   launchDate: Date
   images: string[]
}

export type C_Product = {
   _id: string
   name: string
   description: string
   features: string[]
   price: number
   discount: number
   category: string
   brand: string
   model: string
   color: string
   tags: string[]
   stockQuantity: number
   unitsSold: number
   launchDate: Date
   images: string[]
}

export type Wishlist_Product = {
   _id: string
   name: string
   stockQuantity: number
   price: number
   discount: number
   images: string[]
}

export type Cartlist_Product = {
   _id: string
   productId: string
   quantity: number
   name: string
   stockQuantity: number
   price: number
   discount: number
   images: string[]
}

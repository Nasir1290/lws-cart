import { Types } from 'mongoose'

export type Category = {
   category: string
   thumbnail: string
   href: string
}

export type Res_Category = {
   _id: Types.ObjectId
   category: string
   thumbnail: string
   href: string
}

export type C_Category = {
   _id: string
   category: string
   thumbnail: string
   href: string
}

'use server'

import { mongoConnect } from '@/db/mongo-connect'
import { Review } from '@/models/review'
import { Res_Review } from '@/types/review'

interface Props {
   productId: string
}

export const getComments = async ({ productId }: Props) => {
   try {
      await mongoConnect()
      const reviews: Res_Review[] = await Review.find({ productId })
         .populate('reviewerId', 'name image')
         .lean()
      return reviews.map((review) => ({
         ...review,
         _id: review._id.toString(),
         productId: review.productId.toString(),
      }))
   } catch (error) {
      console.log(error)
      return []
   }
}

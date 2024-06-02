'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { Review } from '@/models/review'
import { User } from '@/models/user'
import { revalidatePath } from 'next/cache'

export const addRatingComment = async (formData: FormData) => {
   const session = await auth()
   if (!session) throw new Error('Please login to make a comment')
   const rating = formData.get('rating')
   const comment = formData.get('comment')
   const productId = formData.get('productId')
   const pathname = formData.get('pathname')
   if (!rating) throw new Error('Please select a rating')
   if (!comment) throw new Error('Please write a comment first')
   try {
      await mongoConnect()
      const reviewerId = await User.exists({ email: session.user?.email })
      await Review.create({
         reviewerId,
         productId,
         rating,
         comment,
      })
   } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
   }
   revalidatePath(pathname?.toString() || '/')
}

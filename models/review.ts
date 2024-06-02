import { T_Review } from '@/types/review'
import { model, models, Schema, Types } from 'mongoose'

const schema = new Schema<T_Review>(
   {
      reviewerId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      productId: {
         type: Schema.Types.ObjectId,
         ref: 'Product',
         required: true,
      },
      rating: {
         type: Number,
         required: true,
      },
      comment: {
         type: String,
         required: true,
      },
   },
   { timestamps: true },
)

export const Review = models.Review || model<T_Review>('Review', schema)

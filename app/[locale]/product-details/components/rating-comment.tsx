'use client'

import SubmitButton from '@/components/ui/submit-button'
import { addRatingComment } from '@/server-actions/add-rating-comment'
import { Lang_Product_Details } from '@/types/lang/product-details'
import { C_Review } from '@/types/review'
import { usePathname } from 'next/navigation'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegStar, FaStar } from 'react-icons/fa'

interface Props {
   productId: string
   comments: C_Review[]
   dict: Lang_Product_Details
}

export default function RatingAndComment({ productId, comments, dict }: Props) {
   const [rating, setRating] = useState<number | null>(null)
   const [hoverRating, setHoverRating] = useState<number>(0)
   const formRef = useRef<HTMLFormElement>(null)
   const pathname = usePathname()
   const handleRating = (value: number) => {
      setRating(value)
   }

   const handleMouseEnter = (value: number) => {
      setHoverRating(value)
   }

   const handleMouseLeave = () => {
      setHoverRating(0)
   }

   const clientAction = async (formData: FormData) => {
      try {
         await addRatingComment(formData)
         if (formRef.current) {
            formRef.current.reset()
         }
         setRating(null)
         toast.success('Review added succesfully')
      } catch (error: any) {
         toast.error(error?.message || 'Failed to add review')
      }
   }

   const avarageRating =
      comments.length > 0
         ? (
              comments.reduce((prev, curr) => prev + curr.rating, 0) /
              comments.length
           ).toFixed(1)
         : 0

   return (
      <div>
         <div className="container p-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
               <h3 className="font-roboto text-gray-800 pb-3 font-medium">
                  {dict.rateThisProduct}
               </h3>
               <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                     <button
                        type="button"
                        key={star}
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                     >
                        {hoverRating >= star || (rating && rating >= star) ? (
                           <FaStar className="text-2xl text-primary" />
                        ) : (
                           <FaRegStar className="text-2xl text-primary" />
                        )}
                     </button>
                  ))}
               </div>
               <form ref={formRef} action={clientAction}>
                  <textarea
                     className="block w-full border px-4 py-3 mb-4 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                     rows={3}
                     placeholder="Leave a comment..."
                     name="comment"
                  />
                  <input
                     name="rating"
                     defaultValue={rating ? rating : ''}
                     hidden
                  />
                  <input name="productId" defaultValue={productId} hidden />
                  <input name="pathname" defaultValue={pathname} hidden />
                  <SubmitButton
                     title={dict.submit}
                     pendingMsg={dict.submitting}
                  />
               </form>
            </div>
            <div>
               <h3 className="font-roboto text-gray-800 pb-3 font-medium">
                  {dict.ratings}
               </h3>
               <div className="grid grid-cols-[150px,1fr]">
                  <div className="grid place-items-center">
                     <h3 className="text-5xl font-semibold">{avarageRating}</h3>
                  </div>
                  <div className="space-y-2">
                     {[5, 4, 3, 2, 1].map((num) => {
                        const parcentage =
                           comments.length > 0
                              ? Math.round(
                                   (comments.filter(
                                      (comment) => comment.rating === num,
                                   ).length *
                                      100) /
                                      comments.length,
                                )
                              : 0
                        return (
                           <div key={num} className="flex gap-2 items-center">
                              <span className="font-medium">{num}</span>
                              <div className="bg-gray-200 h-2 w-full rounded-lg">
                                 <div
                                    style={{ width: `${parcentage}%` }}
                                    className="bg-green-500 h-full rounded-lg"
                                 ></div>
                              </div>
                           </div>
                        )
                     })}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

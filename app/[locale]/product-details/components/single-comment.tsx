import avatar from '@/public/assets/images/cat.png'
import { C_Review } from '@/types/review'
import moment from 'moment'
import Image from 'next/image'

interface Props {
   comment: C_Review
}

export default function SingleComment({ comment }: Props) {
   return (
      <div className="grid grid-cols-[auto,1fr] gap-3 bg-[#f4f4f4] p-4 rounded-md">
         <div>
            <Image
               src={
                  comment.reviewerId?.image ? comment.reviewerId.image : avatar
               }
               alt={comment.reviewerId.name}
               className="w-10 h-10 rounded-full"
               width={40}
               height={40}
            />
         </div>
         <div>
            <h2 className="font-medium flex gap-1">
               {comment.reviewerId.name}
               <span className="text-primary">({comment.rating})</span>
            </h2>
            <p className="text-sm">{comment.comment}</p>
            <span className="text-xs text-gray-600">
               {moment(comment.createdAt).fromNow()}
            </span>
         </div>
      </div>
   )
}

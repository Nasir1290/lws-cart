import { C_Review } from '@/types/review'
import { FaRegStar, FaStar } from 'react-icons/fa'

interface Props {
   comments: C_Review[]
}
export default function StarRating({ comments }: Props) {
   const avarageRating =
      comments.length > 0
         ? comments.reduce((prev, curr) => prev + curr.rating, 0) /
           comments.length
         : 0

   const avarageRound = Math.round(avarageRating)

   return (
      <div className="flex gap-1 text-sm text-yellow-400">
         {[1, 2, 3, 4, 5].map((num) => {
            if (avarageRound >= num) return <FaStar key={num} />
            else return <FaRegStar key={num} className="text-gray-400" />
         })}
      </div>
   )
}

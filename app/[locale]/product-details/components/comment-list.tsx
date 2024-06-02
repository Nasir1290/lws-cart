import { getComments } from '@/server-actions/getComments'

import SingleComment from './single-comment'

interface Props {
   productId: string
}

export default async function CommentList({ productId }: Props) {
   const comments = await getComments({ productId })

   return (
      comments.length > 0 && (
         <div className="container space-y-2 mb-16 max-h-[510px] overflow-y-auto">
            {comments.map((comment) => (
               <SingleComment comment={comment} key={comment._id} />
            ))}
         </div>
      )
   )
}

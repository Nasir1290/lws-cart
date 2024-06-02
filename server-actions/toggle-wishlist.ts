'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { User } from '@/models/user'
import { revalidatePath } from 'next/cache'

interface Props {
   productId: string
   isWishlisted: boolean
}

export const toggleWishlist = async ({ productId, isWishlisted }: Props) => {
   const session = await auth()
   if (!session?.user) return { message: 'Your session expired!' }
   const email = session.user.email
   await mongoConnect()
   if (isWishlisted) {
      await User.findOneAndUpdate({ email }, { $pull: { wishlist: productId } })
   } else {
      await User.findOneAndUpdate(
         { email },
         { $addToSet: { wishlist: productId } },
         { upsert: true },
      )
   }
   revalidatePath(`/product-details/${productId}`)
   revalidatePath(`/wishlist`)
   revalidatePath(`/profile`)
}

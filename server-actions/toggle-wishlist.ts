'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { User } from '@/models/user'
import { Locale } from '@/types/i18n'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface Props {
   productId: string
   isWishlisted: boolean
   locale: Locale
   path: string
}

export const toggleWishlist = async ({
   productId,
   isWishlisted,
   locale,
   path,
}: Props) => {
   const session = await auth()
   const redirectPath = path.split('/').reduce((prev, curr, i) => {
      if (i !== 0) {
         return prev + '/' + curr
      } else return prev
   }, '')
   if (!session?.user)
      redirect(
         `/${locale}/login?_redirect=${redirectPath}&action=add-to-wishlist&actionid=${productId}`,
      )
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

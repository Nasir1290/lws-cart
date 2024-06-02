'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { User } from '@/models/user'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getSingleProduct } from './get-single-product'

interface Props {
   path: string
   locale: string
   quantity: number
   productId: string
   isInCart: boolean
}

export const toggleCartlist = async ({
   path,
   quantity,
   productId,
   isInCart,
   locale,
}: Props) => {
   const session = await auth()
   if (!session?.user)
      redirect(
         `/${locale}/login?_redirect=${path.split('/')[2] ? path.split('/')[2] : path.split('/')[1]}`,
      )

   await mongoConnect()
   if (isInCart) {
      await User.findOneAndUpdate(
         { email: session.user.email },
         {
            $pull: { cart: { productId } },
         },
      )
   } else {
      const product = await getSingleProduct(productId)
      if (product?.stockQuantity && product.stockQuantity >= quantity) {
         await User.findOneAndUpdate(
            { email: session.user.email },
            {
               $addToSet: { cart: { quantity, productId } },
            },
            { upsert: true },
         )
      } else {
         throw new Error(`Oops! Limited stock quantity`)
      }
   }
   revalidatePath(`/${locale}/cart`)
}

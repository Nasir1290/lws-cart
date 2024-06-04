'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { Cart } from '@/models/cart'
import { Product } from '@/models/product'
import { User } from '@/models/user'
import { T_Cart } from '@/types/cart'
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

   try {
      await mongoConnect()
      const userId = await User.exists({ email: session.user.email })
      if (isInCart) {
         const cartItem: T_Cart | null = await Cart.findOneAndDelete({
            userId,
            productId,
         }).lean()
         await Product.findByIdAndUpdate(productId, {
            $inc: {
               stockQuantity: cartItem?.quantity ? cartItem.quantity : quantity,
            },
         })
      } else {
         const product = await getSingleProduct(productId)
         if (product?.stockQuantity && product.stockQuantity >= quantity) {
            await Cart.create({ quantity, productId, userId })
            await Product.findByIdAndUpdate(productId, {
               $inc: { stockQuantity: -1 * quantity },
            })
         } else {
            throw new Error(`Oops! Limited stock quantity`)
         }
      }
   } catch (error: any) {
      throw new Error(error?.message || `Oops! Server failed`)
   }
   revalidatePath(`/${locale}/cart`)
}

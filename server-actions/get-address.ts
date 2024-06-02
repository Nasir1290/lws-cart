'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { User } from '@/models/user'
import { Address } from '@/types/address'

interface Res {
   address: {
      shippingAddress?: Address
      billingAddress?: Address
   }
}

export const getAddress = async () => {
   const session = await auth()
   if (!session?.user) throw new Error('Your session expired!')
   try {
      await mongoConnect()
      const user: Res | null = await User.findOne(
         { email: session?.user.email },
         'address',
      ).lean()
      if (user && user?.address) return user.address
      else return null
   } catch (error: any) {
      throw new Error(error.message || 'Internal server error!')
   }
}

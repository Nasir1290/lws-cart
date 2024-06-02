'use server'

import { auth } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { User } from '@/models/user'
import { addressSchema } from '@/zod/zod-schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const editAddress = async (prev: any, formData: FormData) => {
   const session = await auth()
   if (!session?.user) return { message: 'Your session expired!' }

   const type = formData.get('type')

   const address = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      region: formData.get('region'),
      address: formData.get('address'),
      city: formData.get('city'),
      phone: formData.get('phone'),
      email: formData.get('email'),
   }

   const validatedFields = addressSchema.safeParse(address)

   if (!validatedFields.success) {
      return {
         errors: validatedFields.error.flatten().fieldErrors,
      }
   }
   try {
      const update =
         type === 'shipping'
            ? { $set: { 'address.shippingAddress': address } }
            : { $set: { 'address.billingAddress': address } }
      await mongoConnect()
      await User.findOneAndUpdate({ email: session?.user.email }, update, {
         upsert: true,
      })
   } catch (error: any) {
      return { message: error.message || 'Internal server problem' }
   }
   revalidatePath('/profile')
   redirect('/profile')
}

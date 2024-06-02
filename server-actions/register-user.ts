'use server'

import { mongoConnect } from '@/db/mongo-connect'
import { User } from '@/models/user'
import { registerSchemaBn, registerSchemaEn } from '@/zod/zod-schema'
import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'

export const registerUser = async (prevState: any, formData: FormData) => {
   const user = Object.fromEntries(formData)
   const locale = formData.get('locale')?.toString()!
   const validatedFields =
      locale === 'bn'
         ? registerSchemaBn.safeParse(user)
         : registerSchemaEn.safeParse(user)

   if (!validatedFields.success) {
      return {
         errors: validatedFields.error.flatten().fieldErrors,
      }
   }
   if (user.password !== user.cPassword)
      return { message: 'Password does not match*' }
   try {
      await mongoConnect()
      const isExist = await User.exists({ email: user.email })
      if (isExist) {
         return { message: 'User already exist with the email' }
      } else {
         const hashPass = await hash(user.password.toString(), 10)
         await User.create({ ...user, password: hashPass })
      }
   } catch (error) {
      return { message: 'Internal server error' }
   }
   redirect('/login')
}

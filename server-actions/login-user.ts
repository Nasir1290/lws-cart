'use server'

import { signIn } from '@/auth'
import { mongoConnect } from '@/db/mongo-connect'
import { loginSchemaBn, loginSchemaEn } from '@/zod/zod-schema'
import { redirect } from 'next/navigation'

export const loginUser = async (prevState: any, formData: FormData) => {
   const locale = formData.get('locale')?.toString()!
   const redirectTo = formData.get('redirectTo')?.toString() || `/${locale}`

   const validatedFields =
      locale === 'bn'
         ? loginSchemaBn.safeParse({
              email: formData.get('email'),
              password: formData.get('password'),
           })
         : loginSchemaEn.safeParse({
              email: formData.get('email'),
              password: formData.get('password'),
           })

   if (!validatedFields.success) {
      return {
         errors: validatedFields.error.flatten().fieldErrors,
      }
   }

   try {
      await mongoConnect()
      await signIn('credentials', {
         email: formData.get('email'),
         password: formData.get('password'),
         redirect: false,
      })
   } catch (error: any) {
      return { message: error.message }
   }
   redirect(redirectTo)
}

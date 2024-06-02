'use server'

import { signIn } from '@/auth'

export const signInFacebook = async (redirectTo: string) => {
   await signIn('facebook', { redirectTo })
}

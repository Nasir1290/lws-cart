'use server'

import { signIn } from '@/auth'

interface Props {
   redirectTo: string
}

export const signInGoogle = async ({ redirectTo }: Props) => {
   await signIn('google', { redirectTo })
}

'use server'

import { signOut } from '@/auth'
import { Locale } from '@/types/i18n'

export const logoutUser = async (locale: Locale) => {
   await signOut({ redirectTo: `/${locale}/login` })
}

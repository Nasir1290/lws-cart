'use client'

import { logoutUser } from '@/server-actions/logout-user'
import { Locale } from '@/types/i18n'

import LogoutSubmitButton from './logout-submit'

interface Props {
   locale: Locale,
   dict:string
}

export default function LogoutButton({ locale, dict }: Props) {
   const updatedAction = logoutUser.bind(null, locale)
   return (
      <form action={updatedAction}>
         <LogoutSubmitButton dict={dict} />
      </form>
   )
}

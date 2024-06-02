'use server'

import { Locale } from '@/types/i18n'
import { redirect } from 'next/navigation'

interface Props {
   locale: Locale
   pathname: string
}

export const localeSwitch = async (
   { locale, pathname }: Props,
   formData: FormData,
) => {
   const newLocale = formData.get('newLocale')

   const newPath =
      pathname === `/${locale}`
         ? pathname.replace(`/${locale}`, `/${newLocale}`)
         : pathname.replace(`/${locale}/`, `/${newLocale}/`)

   redirect(newPath)
}

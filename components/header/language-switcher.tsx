'use client'

import { localeSwitch } from '@/server-actions/locale-switch'
import { Locale } from '@/types/i18n'
import { usePathname } from 'next/navigation'

import LocaleSubmitButton from './locale-submit-button'

interface Props {
   locale: Locale
}

export default function LanguageSwitcher({ locale }: Props) {
   const pathname = usePathname()
   const updatedAction = localeSwitch.bind(null, { locale, pathname })

   return (
      <div className="flex justify-center items-center bg-gray-300 rounded-md p-[2px] text-sm">
         <form action={updatedAction}>
            <input type="text" name="newLocale" hidden defaultValue="en" />
            <LocaleSubmitButton identity="en" locale={locale} />
         </form>
         <form action={updatedAction}>
            <input type="text" name="newLocale" hidden defaultValue="bn" />
            <LocaleSubmitButton identity="bn" locale={locale} />
         </form>
      </div>
   )
}

import { Locale } from '@/types/i18n'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from 'react-icons/im'

interface Props {
   locale: Locale
   identity: Locale
}

export default function LocaleSubmitButton({ locale, identity }: Props) {
   const { pending } = useFormStatus()

   return (
      <button
         disabled={pending || locale === identity}
         type="submit"
         className={`rounded-md flex justify-center items-center ${locale === identity ? 'cursor-not-allowed' : 'opacity-50'}`}
      >
         {locale === identity ? (
            <span
               className={`py-1 px-2 rounded-md bg-gray-800 text-white flex justify-center items-center`}
            >
               {identity === 'bn' ? 'বাংলা' : 'English'}
            </span>
         ) : pending ? (
            <span
               className={`flex justify-center items-center ${identity === 'en' ? 'w-[65px]' : ''} ${identity === 'bn' ? 'w-[49px]' : ''}`}
            >
               <ImSpinner2 className="animate-spin" />
            </span>
         ) : (
            <span className="py-1 px-2">
               {identity === 'bn' ? 'বাংলা' : 'English'}
            </span>
         )}
      </button>
   )
}

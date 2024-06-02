import method from '@/public/assets/images/methods.png'
import { Locale } from '@/types/i18n'
import Image from 'next/image'

export default async function Copyright({ locale }: { locale: Locale }) {
   const bangla = await import('./bn.json')
   const english = await import('./en.json')
   const dict = locale === 'bn' ? bangla : english

   return (
      <div className="bg-gray-800 py-4">
         <div className="container flex items-center justify-between">
            <p className="text-white">{dict.copyright}</p>
            <div>
               <Image src={method} alt="methods" className="h-5 w-[238px]" />
            </div>
         </div>
      </div>
   )
}

import { auth } from '@/auth'
import { Locale } from '@/types/i18n'
import Link from 'next/link'

import CategoryMenu from './category-menu'
import LanguageSwitcher from './language-switcher'

export default async function Navbar({ locale }: { locale: Locale }) {
   const session = await auth()
   const bangla = await import('./bn.json')
   const english = await import('./en.json')
   const dict = locale === 'bn' ? bangla : english

   return (
      <nav className="bg-gray-800">
         <div className="container flex">
            <CategoryMenu locale={locale} allCategories={dict.default.allCategories} />
            <div className="flex items-center justify-between flex-grow pl-12">
               <div className="flex items-center space-x-6 capitalize">
                  <Link
                     href={`/${locale}`}
                     className="text-gray-200 hover:text-white transition"
                  >
                     {dict.navlinks.home}
                  </Link>
                  <Link
                     href={`/${locale}/shop`}
                     className="text-gray-200 hover:text-white transition"
                  >
                     {dict.navlinks.shop}
                  </Link>
                  <Link
                     href={`/${locale}/order-list`}
                     className="text-gray-200 hover:text-white transition"
                  >
                     {dict.navlinks.myOrders}
                  </Link>
               </div>
               <div className="flex items-center gap-3">
                  <LanguageSwitcher locale={locale} />
                  {!session && (
                     <Link
                        href={`/${locale}/login`}
                        className="text-gray-200 hover:text-white transition"
                     >
                        {dict.navlinks.login}
                     </Link>
                  )}
               </div>
            </div>
         </div>
      </nav>
   )
}

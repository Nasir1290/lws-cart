import { auth } from '@/auth'
import { Locale } from '@/types/i18n'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import LanguageSwitcher from './language-switcher'


export default async function Navbar({ locale }: { locale: Locale }) {
   const session = await auth()
   const bangla = await import('./bn.json')
   const english = await import('./en.json')
   const dict = locale === 'bn' ? bangla : english

   return (
      <nav className="bg-gray-800">
         <div className="container flex">
            <div className="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
               <span className="text-white">
                  <GiHamburgerMenu />
               </span>
               <span className="capitalize ml-2 text-white">
                  {dict.allCategories}
               </span>

               {/* <!-- dropdown --> */}
               <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                  <a
                     href="#"
                     className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                  >
                     <img
                        src="../assets/images/icons/sofa.svg"
                        alt="sofa"
                        className="w-5 h-5 object-contain"
                     />
                     <span className="ml-6 text-gray-600 text-sm">Sofa</span>
                  </a>
                  <a
                     href="#"
                     className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                  >
                     <img
                        src="../assets/images/icons/terrace.svg"
                        alt="terrace"
                        className="w-5 h-5 object-contain"
                     />
                     <span className="ml-6 text-gray-600 text-sm">Terarce</span>
                  </a>
                  <a
                     href="#"
                     className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                  >
                     <img
                        src="../assets/images/icons/bed.svg"
                        alt="bed"
                        className="w-5 h-5 object-contain"
                     />
                     <span className="ml-6 text-gray-600 text-sm">Bed</span>
                  </a>
                  <a
                     href="#"
                     className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                  >
                     <img
                        src="../assets/images/icons/office.svg"
                        alt="office"
                        className="w-5 h-5 object-contain"
                     />
                     <span className="ml-6 text-gray-600 text-sm">office</span>
                  </a>
                  <a
                     href="#"
                     className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                  >
                     <img
                        src="../assets/images/icons/outdoor-cafe.svg"
                        alt="outdoor"
                        className="w-5 h-5 object-contain"
                     />
                     <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
                  </a>
                  <a
                     href="#"
                     className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                  >
                     <img
                        src="../assets/images/icons/bed-2.svg"
                        alt="Mattress"
                        className="w-5 h-5 object-contain"
                     />
                     <span className="ml-6 text-gray-600 text-sm">
                        Mattress
                     </span>
                  </a>
               </div>
            </div>

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
               <div className='flex items-center gap-3'>
                  <LanguageSwitcher locale={locale}/>
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

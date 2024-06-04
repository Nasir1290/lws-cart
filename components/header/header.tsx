import { auth } from '@/auth'
import logo from '@/public/assets/images/logo.svg'
import { Locale } from '@/types/i18n'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegUser } from 'react-icons/fa6'

import CartExpiryChecker from './cart-expiry-checker'
import HeaderCartlistButton from './header-cartlist-button'
import HeaderWishlistButton from './header-wishlist-button'
import RefreshTokenHandler from './refresh-token-handler'
import SearchBar from './search-bar'

interface Props {
   locale: Locale
}

export default async function Header({ locale }: Props) {
   const session = await auth()
   const bangla = await import('./bn.json')
   const english = await import('./en.json')
   const dict = locale === 'bn' ? bangla : english

   return (
      <header className="py-4 shadow-sm bg-white print:hidden">
         {/* Sign out if failed refreshed Token. */}
         <RefreshTokenHandler />
         <CartExpiryChecker />
         <div className="container flex items-center justify-between">
            <Link href={`/${locale}`}>
               <Image src={logo} alt="Logo" className="w-32" />
            </Link>

            <SearchBar dict={dict.default.header} locale={locale} />

            <div className="flex items-center space-x-4">
               <HeaderWishlistButton locale={locale} />
               <HeaderCartlistButton locale={locale} />
               <Link
                  href={`/${locale}/profile`}
                  className="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center gap-y-2"
               >
                  {session?.user?.image ? (
                     <Image
                        className="rounded-full w-6 h-6"
                        src={session.user.image}
                        alt={session.user.name || 'Profile-Avater'}
                        width={200}
                        height={200}
                     />
                  ) : (
                     <FaRegUser className="text-2xl" />
                  )}

                  <div className="text-xs leading-3">
                     {session
                        ? session.user?.name?.split(' ')[0]
                        : dict.header.account}
                  </div>
               </Link>
            </div>
         </div>
      </header>
   )
}

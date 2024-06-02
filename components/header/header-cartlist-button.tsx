import { getCartlist } from '@/server-actions/get-cartlist'
import { Locale } from '@/types/i18n'
import Link from 'next/link'
import { LuShoppingCart } from 'react-icons/lu'

interface Props {
   locale: Locale
}

export default async function HeaderCartlistButton({ locale }: Props) {
   const products = await getCartlist()
   const bangla = await import('./bn.json')
   const english = await import('./en.json')
   const dict = locale === 'bn' ? bangla : english

   return (
      <Link
         href={`/${locale}/cart`}
         className="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center gap-y-2"
      >
         <LuShoppingCart className="text-2xl" />
         <div className="text-xs leading-3">{dict.header.cart}</div>
         {products?.length > 0 && (
            <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
               {products.length}
            </div>
         )}
      </Link>
   )
}

import { getWishlist } from '@/server-actions/get-wishlist'
import { Locale } from '@/types/i18n'
import Link from 'next/link'
import { FaRegHeart } from 'react-icons/fa'

interface Props {
   locale: Locale
}

export default async function HeaderWishlistButton({ locale }: Props) {
   const products = await getWishlist()
   const bangla = await import('./bn.json')
   const english = await import('./en.json')
   const dict = locale === 'bn' ? bangla : english

   return (
      <Link
         href={`/${locale}/wishlist`}
         className="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center gap-y-2"
      >
         <FaRegHeart className="text-2xl" />
         <div className="text-xs leading-3">{dict.header.wishlist}</div>
         {products.length > 0 && (
            <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
               {products.length}
            </div>
         )}
      </Link>
   )
}

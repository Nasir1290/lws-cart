import { getWishlist } from '@/server-actions/get-wishlist'
import { Lang_Profile } from '@/types/lang/profile'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'

import SmallProductCard from './small-product-card'

interface Props {
   dict: Lang_Profile
}

export default async function ProfileWishlist({ dict }: Props) {
   const products = await getWishlist()

   return (
      products.length > 0 && (
         <div>
            <div className="flex justify-between mb-4">
               <h2 className="text-lg font-semibold">{dict.wishlist}</h2>
               <div>
                  <Link
                     className="bg-primary text-white px-4 py-2 text-sm rounded-md flex items-center gap-2"
                     href="/wishlist"
                  >
                     <span>{dict.viewDetails}</span> <FaChevronRight />
                  </Link>
               </div>
            </div>
            <div className="bg-sky-700/5 rounded-md">
               {products.map((product) => (
                  <SmallProductCard key={product._id} product={product} />
               ))}
            </div>
         </div>
      )
   )
}

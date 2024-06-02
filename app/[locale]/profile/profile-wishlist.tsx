import { getWishlist } from '@/server-actions/get-wishlist'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'

import SmallProductCard from './small-product-card'

export default async function ProfileWishlist() {
   const products = await getWishlist()

   return (
      products.length > 0 && (
         <div>
            <div className="flex justify-between mb-4">
               <h2 className="text-lg font-semibold">WishList</h2>
               <div>
                  <Link
                     className="bg-primary text-white px-4 py-2 text-sm rounded-md flex items-center gap-2"
                     href="/wishlist"
                  >
                     <span>View Details</span> <FaChevronRight />
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

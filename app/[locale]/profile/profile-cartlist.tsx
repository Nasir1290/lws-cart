import { getCartlist } from '@/server-actions/get-cartlist'
import Link from 'next/link'
import { FaChevronRight, FaRegEdit } from 'react-icons/fa'

import SmallProductCard from './small-product-card'

export default async function ProfileCartlist() {
   const products = await getCartlist()

   return (
      products?.length > 0 && (
         <div>
            <div className="flex justify-between mb-4">
               <h2 className="text-lg font-semibold">Cart</h2>
               <div className="flex items-center gap-2">
                  <Link
                     className="bg-primary text-white px-4 py-2 text-sm rounded-md flex items-center gap-2"
                     href="/cart"
                  >
                     <span>Modify</span> <FaRegEdit />
                  </Link>
                  <Link
                     className="bg-primary text-white px-4 py-2 text-sm rounded-md flex items-center gap-2"
                     href="/checkout"
                  >
                     <span>Checkout</span> <FaChevronRight />
                  </Link>
               </div>
            </div>
            <div className="bg-green-700/5 rounded-md">
               {products.map((product) => (
                  <SmallProductCard key={product._id} product={product} />
               ))}
            </div>
         </div>
      )
   )
}

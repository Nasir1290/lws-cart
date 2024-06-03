import { getCartlist } from '@/server-actions/get-cartlist'
import { Lang_Profile } from '@/types/lang/profile'
import Link from 'next/link'
import { FaChevronRight, FaRegEdit } from 'react-icons/fa'

import SmallProductCard from './small-product-card'

interface Props {
   dict: Lang_Profile
}

export default async function ProfileCartlist({ dict }: Props) {
   const products = await getCartlist()

   return (
      products?.length > 0 && (
         <div>
            <div className="flex justify-between mb-4">
               <h2 className="text-lg font-semibold">{dict.cart}</h2>
               <div className="flex items-center gap-2">
                  <Link
                     className="bg-primary text-white px-4 py-2 text-sm rounded-md flex items-center gap-2"
                     href="/cart"
                  >
                     <span>{dict.modify}</span> <FaRegEdit />
                  </Link>
                  <Link
                     className="bg-primary text-white px-4 py-2 text-sm rounded-md flex items-center gap-2"
                     href="/checkout"
                  >
                     <span>{dict.checkout}</span> <FaChevronRight />
                  </Link>
               </div>
            </div>
            <div className="bg-green-700/5 rounded-md">
               {products.map((product) => (
                  <SmallProductCard
                     key={product._id}
                     product={{
                        ...product.product,
                        _id: product._id,
                        productId: product.product._id,
                     }}
                  />
               ))}
            </div>
         </div>
      )
   )
}

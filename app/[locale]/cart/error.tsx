'use client'

import emptyCart from '@/public/assets/images/empty-cart.png'
import Image from 'next/image'

export default function Error() {
   return (
      <div className="flex flex-col justify-center items-center gap-y-5 min-h-[calc(100vh-300px)]">
         <Image className="w-20" src={emptyCart} alt="folder-icon" />
         <h2 className="text-2xl font-bold text-gray-500">
            Something Went Wrong!
         </h2>
      </div>
   )
}

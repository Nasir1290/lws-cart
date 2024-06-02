import { auth } from '@/auth'
import Breadcrumb from '@/components/ui/breadcrumb'
import folderIcon from '@/public/assets/images/folder.png'
import { getWishlist } from '@/server-actions/get-wishlist'
import { Locale } from '@/types/i18n'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import WishlistCard from './components/wishlist-card'

interface Props {
   params: {
      locale: Locale
   }
}

export default async function Wishlist({ params }: Props) {
   const session = await auth()
   if (!session) redirect(`/${params.locale}/login?_redirect=wishlist`)
   const products = await getWishlist()

   return (
      <>
         <Breadcrumb current="Wishlist" />
         <div className="container gap-6 pt-4 pb-16 min-h-[calc(100vh-130px)]">
            {products.length > 0 ? (
               <div className="mx-auto space-y-4 max-w-6xl">
                  {products.map((product) => (
                     <WishlistCard locale={params.locale} key={product._id} product={product} />
                  ))}
               </div>
            ) : (
               <div className="flex items-center justify-center col-span-3 h-full">
                  <div className="flex flex-col justify-center items-center gap-y-5 h-full">
                     <Image
                        className="w-20"
                        src={folderIcon}
                        alt="folder-icon"
                     />
                     <h2 className="text-2xl font-bold text-gray-500">
                        Oops! Wishlist is Empty
                     </h2>
                  </div>
               </div>
            )}
         </div>
      </>
   )
}

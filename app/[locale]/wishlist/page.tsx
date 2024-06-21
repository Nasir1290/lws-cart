import { auth } from '@/auth'
import Breadcrumb from '@/components/ui/breadcrumb'
import folderIcon from '@/public/assets/images/folder.png'
import { getWishlist } from '@/server-actions/get-wishlist'
import { Locale } from '@/types/i18n'
import { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import WishlistCard from './components/wishlist-card'

export const metadata: Metadata = {
   title: 'My Wishlist - LWSKart',
   description:
      'Create and manage your wishlist at LWSKart. Save your favorite items for later and never miss out on great deals. Start building your wishlist today and shop smarter!',
}

interface Props {
   params: {
      locale: Locale
   }
}

export default async function Wishlist({ params }: Props) {
   const session = await auth()
   if (!session)
      redirect(`/${params.locale}/login?_redirect=${params.locale}/wishlist`)
   const products = await getWishlist()

   const bangla = await import('./components/bn.json')
   const english = await import('./components/en.json')
   const dict = params.locale === 'bn' ? bangla : english

   return (
      <>
         <Breadcrumb current="Wishlist" />
         <div className="container gap-6 pt-4 pb-16 min-h-[calc(100vh-130px)]">
            {products.length > 0 ? (
               <div className="mx-auto space-y-4 max-w-6xl">
                  {products.map((product) => (
                     <WishlistCard
                        dict={dict.default}
                        locale={params.locale}
                        key={product._id}
                        product={product}
                     />
                  ))}
               </div>
            ) : (
               <div className="flex flex-col justify-center items-center gap-y-5 min-h-[calc(100vh-300px)]">
                  <Image className="w-20" src={folderIcon} alt="folder-icon" />
                  <h2 className="text-2xl font-bold text-gray-500">
                     Oops! Wishlist is Empty
                  </h2>
               </div>
            )}
         </div>
      </>
   )
}

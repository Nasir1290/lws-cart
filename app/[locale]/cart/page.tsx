import { auth } from '@/auth'
import Breadcrumb from '@/components/ui/breadcrumb'
import emptyCart from '@/public/assets/images/empty-cart.png'
import { getCartlist } from '@/server-actions/get-cartlist'
import { Locale } from '@/types/i18n'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FaChevronRight } from 'react-icons/fa6'

import CartCard from './components/cart-card'

export const metadata: Metadata = {
   title: 'My Shopping Cart - LWSKart',
   description:
      'Review and manage items in your shopping cart at LWSKart. Easily add, remove, and update items before checkout. Shop conveniently and efficiently with LWSKart!',
}

interface Props {
   params: {
      locale: Locale
   }
}

export default async function Cart({ params: { locale } }: Props) {
   const session = await auth()
   if (!session) redirect(`/${locale}/login?_redirect=${locale}/cart`)
   const products = await getCartlist()

   const bangla = await import('./components/bn.json')
   const english = await import('./components/en.json')
   const dict = locale === 'bn' ? bangla : english

   return (
      <>
         <Breadcrumb current="Cart" />
         <div className="container gap-6 pt-4 pb-16 min-h-[calc(100vh-130px)]">
            {products.length > 0 ? (
               <>
                  <div className="mx-auto space-y-4 max-w-6xl">
                     {products.map((product) => (
                        <CartCard
                           dict={dict.default}
                           locale={locale}
                           key={product._id}
                           product={product}
                        />
                     ))}
                  </div>
                  <div className="justify-end max-w-6xl mx-auto flex mt-4">
                     <Link
                        className="bg-primary px-4 py-2 text-white rounded flex items-center gap-2 hover:bg-primary/90"
                        href={`/${locale}/checkout`}
                     >
                        {dict.checkout} <FaChevronRight />
                     </Link>
                  </div>
               </>
            ) : (
               <div className="flex flex-col justify-center items-center gap-y-5 min-h-[calc(100vh-300px)]">
                  <Image className="w-20" src={emptyCart} alt="folder-icon" />
                  <h2 className="text-2xl font-bold text-gray-500">
                     Cart is Empty!{' '}
                     <Link className="text-primary" href={`/${locale}/shop`}>
                        Shop Now
                     </Link>
                  </h2>
               </div>
            )}
         </div>
      </>
   )
}

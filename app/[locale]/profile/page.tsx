import { auth } from '@/auth'
import Breadcrumb from '@/components/ui/breadcrumb'
import LogoutButton from '@/components/ui/logout-button'
import { getAddress } from '@/server-actions/get-address'
import { Locale } from '@/types/i18n'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import BillingAddress from './billing-address'
import ProfileCartlist from './profile-cartlist'
import ProfileWishlist from './profile-wishlist'
import ShippingAddress from './shipping-address'

interface Props {
   params: {
      locale: Locale
   }
}

export default async function Profile({ params: { locale } }: Props) {
   const session = await auth()

   if (!session) redirect(`/${locale}/login?_redirect=profile`)

   const address = await getAddress()

   return (
      <>
         <Breadcrumb current="Account" />
         <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg p-6">
               {/* Personal Information Section */}
               <section className="mb-8 bg-gray-700/5 p-4 rounded-md">
                  <h2 className="text-lg font-semibold mb-4">
                     Personal Information
                  </h2>
                  <div className="flex space-x-4 mb-4">
                     <div>
                        <Image
                           width={100}
                           height={100}
                           quality={100}
                           src={
                              session.user?.image
                                 ? session.user.image
                                 : '/assets/images/cat.png'
                           }
                           alt="Customer"
                           className="rounded-md bg-blue-100"
                        />
                     </div>
                     <div>
                        <h2 className="text-2xl font-semibold">
                           {session?.user?.name}
                        </h2>
                        <p className="text-gray-600">{session?.user?.email}</p>
                        <LogoutButton locale={locale} />
                     </div>
                  </div>
               </section>

               <section className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Addresses</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     <BillingAddress address={address?.billingAddress} />
                     <ShippingAddress address={address?.shippingAddress} />
                  </div>
               </section>

               <section>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     <ProfileCartlist />
                     <ProfileWishlist />
                  </div>
               </section>
            </div>
         </div>
      </>
   )
}

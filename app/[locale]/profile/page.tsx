import { auth } from '@/auth'
import Breadcrumb from '@/components/ui/breadcrumb'
import LogoutButton from '@/components/ui/logout-button'
import { getAddress } from '@/server-actions/get-address'
import { Locale } from '@/types/i18n'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import BillingAddress from './billing-address'
import ProfileCartlist from './profile-cartlist'
import ProfileWishlist from './profile-wishlist'
import ShippingAddress from './shipping-address'

export async function generateMetadata(
   { params }: { params: {} },
   parent: ResolvingMetadata,
): Promise<Metadata> {
   const parentMatadata = await parent
   try {
      const session = await auth()
      if (session?.user) {
         return {
            title: session.user.name,
            generator: 'LWSKart - Your One-Stop Online Shop',
            applicationName: 'LWSKart',
            referrer: 'origin-when-cross-origin',
            openGraph: {
               title: session.user.name?.toString(),
               siteName: 'LWSKart',
               images: [
                  {
                     url: session.user?.image
                        ? session.user.image
                        : '/public/assets/images/cat.png',
                     width: 800,
                     height: 600,
                  },
               ],
               locale: 'en_US',
               type: 'website',
            },
            icons: {
               icon: '/assets/images/favicon/favicon-32x32.png',
               shortcut: '/assets/images/favicon/favicon-16x16.png',
               apple: '/assets/images/favicon/apple-touch-icon.png',
            },
         }
      } else
         return {
            title: parentMatadata.title,
            description: parentMatadata.description,
            keywords: parentMatadata.keywords,
         }
   } catch (error) {
      return {
         title: parentMatadata.title,
         description: parentMatadata.description,
         keywords: parentMatadata.keywords,
      }
   }
}

interface Props {
   params: {
      locale: Locale
   }
}

export default async function Profile({ params: { locale } }: Props) {
   const session = await auth()
   if (!session) redirect(`/${locale}/login?_redirect=profile`)

   const bangla = await import('./bn.json')
   const english = await import('./en.json')
   const dict = locale === 'bn' ? bangla : english

   const address = await getAddress()

   return (
      <>
         <Breadcrumb current="Account" />
         <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg p-6">
               {/* Personal Information Section */}
               <section className="mb-8 bg-gray-700/5 p-4 rounded-md">
                  <h2 className="text-lg font-semibold mb-4">
                     {dict.personalInformation}
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
                        <LogoutButton
                           dict={dict.default.logout}
                           locale={locale}
                        />
                     </div>
                  </div>
               </section>

               <section className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">
                     {dict.addresses}
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     <BillingAddress
                        dict={dict}
                        address={address?.billingAddress}
                     />
                     <ShippingAddress
                        dict={dict}
                        address={address?.shippingAddress}
                     />
                  </div>
               </section>

               <section>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     <ProfileCartlist dict={dict} />
                     <ProfileWishlist dict={dict} />
                  </div>
               </section>
            </div>
         </div>
      </>
   )
}

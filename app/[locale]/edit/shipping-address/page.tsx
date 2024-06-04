import { auth } from '@/auth'
import { getAddress } from '@/server-actions/get-address'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import AddressForm from './address-form'

export const metadata: Metadata = {
   title: 'Edit Shipping Address - LWSKart',
   description:
      'Update your shipping address details quickly and conveniently at LWSKart. Manage your account information easily to ensure accurate delivery and hassle-free shopping experience.',
}

export default async function ShippingAddressEdit() {
   const session = await auth()
   if (!session) redirect('/login?_redirect=edit/shipping-address')

   const address = await getAddress()

   return (
      <div className="container pb-16 pt-4 gap-6 bg-white">
         <AddressForm type="shipping" address={address?.shippingAddress} />
      </div>
   )
}

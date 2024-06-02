import { auth } from '@/auth'
import { getAddress } from '@/server-actions/get-address'
import { redirect } from 'next/navigation'

import AddressForm from './address-form'

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

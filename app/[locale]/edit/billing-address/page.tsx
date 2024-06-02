import { auth } from '@/auth'
import { getAddress } from '@/server-actions/get-address'
import { redirect } from 'next/navigation'

import AddressForm from '../shipping-address/address-form'

export default async function BillingAddressEdit() {
   const session = await auth()
   if (!session) redirect('/login?_redirect=edit/billing-address')
   const address = await getAddress()

   return (
      <div className="container pb-16 pt-4 bg-white">
         <AddressForm type="billing" address={address?.billingAddress} />
      </div>
   )
}

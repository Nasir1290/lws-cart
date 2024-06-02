import { auth } from '@/auth'
import Breadcrumb from '@/components/ui/breadcrumb'
import { getAddress } from '@/server-actions/get-address'
import { getCartlist } from '@/server-actions/get-cartlist'
import { Locale } from '@/types/i18n'
import { redirect } from 'next/navigation'

import CheckoutForm from './components/checkout-form'

interface Props {
   params: {
      locale: Locale
   }
}

export default async function Checkout({ params: { locale } }: Props) {
   const session = await auth()
   if (!session) redirect(`/${locale}/login?_redirect=checkout`)
   const products = await getCartlist()
   if (products.length <= 0) redirect('/')
   const address = await getAddress()
   const totalPrice = products.reduce((prev, curr) => {
      const discountPrice = (curr.price * (100 - curr.discount)) / 100
      return prev + discountPrice * curr.quantity
   }, 0)

   return (
      <>
         <Breadcrumb current="Checkout" />
         <CheckoutForm
            locale={locale}
            totalPrice={totalPrice}
            products={products}
            address={address?.shippingAddress}
         />
      </>
   )
}

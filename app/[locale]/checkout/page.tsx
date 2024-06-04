import { auth } from '@/auth'
import Breadcrumb from '@/components/ui/breadcrumb'
import { getAddress } from '@/server-actions/get-address'
import { getCartlist } from '@/server-actions/get-cartlist'
import { Locale } from '@/types/i18n'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import CheckoutForm from './components/checkout-form'

export const metadata: Metadata = {
   title: 'Checkout - Secure Payment - LWSKart',
   description:
      'Complete your purchase securely and efficiently at LWSKart. Enter your payment and shipping details to finalize your order. Shop with confidence and enjoy fast delivery!',
}

interface Props {
   params: {
      locale: Locale
   }
}

export default async function Checkout({ params: { locale } }: Props) {
   const session = await auth()
   if (!session) redirect(`/${locale}/login?_redirect=checkout`)
   const products = await getCartlist()
   if (products.length <= 0) redirect(`/${locale}`)
   const address = await getAddress()
   const totalPrice = products.reduce((prev, curr) => {
      const discountPrice =
         (curr.product.price * (100 - curr.product.discount)) / 100
      return prev + discountPrice * curr.product.quantity
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

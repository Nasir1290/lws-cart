'use client'

import InputField from '@/components/ui/input-field'
import { checkoutAction } from '@/server-actions/checkout-action'
import { Address } from '@/types/address'
import { Locale } from '@/types/i18n'
import { Cartlist_Product } from '@/types/product'
import { useFormState } from 'react-dom'

import OrderSummary from './order-summary'

interface Props {
   address?: Address
   totalPrice: number
   products: Cartlist_Product[]
   locale: Locale
}

export default function CheckoutForm({
   address,
   products,
   totalPrice,
   locale,
}: Props) {
   const [state, formAction] = useFormState(checkoutAction, { message: '' })
   return (
      <form
         action={formAction}
         className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6"
      >
         <div className="col-span-8 border border-gray-200 p-4 rounded">
            <h3 className="text-lg font-medium capitalize mb-4">
               Checkout{' '}
               <span className="opacity-50">
                  (Provide Current Shipping Address)
               </span>
            </h3>
            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <InputField
                     label="First Name"
                     name="firstName"
                     placeholder="Enter first name"
                     type="text"
                     defaultValue={address?.firstName}
                     errors={state?.errors?.firstName}
                  />
                  <InputField
                     label="Last Name"
                     name="lastName"
                     placeholder="Enter last name"
                     type="text"
                     defaultValue={address?.lastName}
                     errors={state?.errors?.lastName}
                  />
               </div>
               <InputField
                  label="Country/Region"
                  name="region"
                  placeholder="Enter country/region"
                  type="text"
                  defaultValue={address?.region}
                  errors={state?.errors?.region}
               />
               <InputField
                  label="Street address"
                  name="address"
                  placeholder="Enter address"
                  type="text"
                  defaultValue={address?.address}
                  errors={state?.errors?.address}
               />
               <InputField
                  label="City"
                  name="city"
                  placeholder="Enter city"
                  type="text"
                  defaultValue={address?.city}
                  errors={state?.errors?.city}
               />
               <InputField
                  label="Phone number"
                  name="phone"
                  placeholder="Enter phone"
                  type="text"
                  defaultValue={address?.phone}
                  errors={state?.errors?.phone}
               />
               <InputField
                  label="Email address"
                  name="email"
                  placeholder="Enter email"
                  type="email"
                  defaultValue={address?.email}
                  errors={state?.errors?.email}
               />
               <input type="text" name="locale" value={locale} hidden />
            </div>
         </div>
         <OrderSummary
            error={state?.message}
            products={products}
            totalPrice={totalPrice}
         />
      </form>
   )
}

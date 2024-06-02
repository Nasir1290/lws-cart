'use client'

import FormError from '@/components/ui/form-error'
import InputField from '@/components/ui/input-field'
import SubmitButton from '@/components/ui/submit-button'
import { editAddress } from '@/server-actions/edit-shipping-address'
import { Address } from '@/types/address'
import { useFormState } from 'react-dom'

interface Props {
   address?: Address
   type: 'shipping' | 'billing'
}

export default function AddressForm({ address, type }: Props) {
   const [state, formAction] = useFormState(editAddress, {
      message: '',
   })

   return (
      <form action={formAction} className="max-w-4xl mx-auto">
         <div className="p-4 rounded">
            <h3 className="text-lg font-medium capitalize mb-4">
               {type === 'shipping' ? 'Shipping Address' : 'Billing Address'}
            </h3>
            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <InputField
                     label="First Name"
                     name="firstName"
                     placeholder="Enter first name"
                     type="text"
                     defaultValue={address?.firstName}
                     errors={state.errors?.firstName}
                  />
                  <InputField
                     label="Last Name"
                     name="lastName"
                     placeholder="Enter last name"
                     type="text"
                     defaultValue={address?.lastName}
                     errors={state.errors?.lastName}
                  />
               </div>
               <InputField
                  label="Country/Region"
                  name="region"
                  placeholder="Enter country/region"
                  type="text"
                  defaultValue={address?.region}
                  errors={state.errors?.region}
               />
               <InputField
                  label="Street address"
                  name="address"
                  placeholder="Enter address"
                  type="text"
                  defaultValue={address?.address}
                  errors={state.errors?.address}
               />
               <InputField
                  label="City"
                  name="city"
                  placeholder="Enter city"
                  type="text"
                  defaultValue={address?.city}
                  errors={state.errors?.city}
               />
               <InputField
                  label="Phone number"
                  name="phone"
                  placeholder="Enter phone"
                  type="text"
                  defaultValue={address?.phone}
                  errors={state.errors?.phone}
               />
               <InputField
                  label="Email address"
                  name="email"
                  placeholder="Enter email"
                  type="email"
                  defaultValue={address?.email}
                  errors={state.errors?.email}
               />
               <input hidden readOnly name="type" value={type} />
               <SubmitButton
                  title={`Save ${type === 'shipping' ? 'Shipping Address' : 'Billing Address'}`}
                  pendingMsg="Connecting..."
               />
               <FormError message={state.message} />
            </div>
         </div>
      </form>
   )
}

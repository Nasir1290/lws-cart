'use client'

import FormError from '@/components/ui/form-error'
import InputField from '@/components/ui/input-field'
import SubmitButton from '@/components/ui/submit-button'
import { registerUser } from '@/server-actions/register-user'
import { Locale } from '@/types/i18n'
import { Lang_Register } from '@/types/lang/register'
import { useFormState } from 'react-dom'

interface Props {
   dict: Lang_Register
   locale: Locale
}

export default function RegisterForm({ dict, locale }: Props) {
   const [state, formAction] = useFormState(registerUser, { message: '' })

   return (
      <form action={formAction} autoComplete="off">
         <div className="space-y-2">
            <FormError message={state?.message} />
            <InputField
               name="name"
               label={dict.fullName}
               errors={state?.errors?.name}
               type="text"
               placeholder="Enter your full name"
            />
            <InputField
               name="email"
               label={dict.emailAddress}
               errors={state?.errors?.email}
               type="email"
               placeholder="youremail.@domain.com"
            />
            <InputField
               name="password"
               label={dict.password}
               errors={state?.errors?.password}
               type="password"
               placeholder="*******"
            />
            <InputField
               name="cPassword"
               label={dict.confirmPassword}
               errors={state?.errors?.cPassword}
               type="password"
               placeholder="*******"
            />
            <input type="text" name="locale" hidden value={locale} />
         </div>
         <div className="mt-6">
            <div className="flex items-center">
               <input
                  type="checkbox"
                  name="aggrement"
                  id="aggrement"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
               />
               <label
                  htmlFor="aggrement"
                  className="text-gray-600 ml-3 cursor-pointer"
               >
                  {dict.agreement}{' '}
                  <a href="#" className="text-primary">
                     {dict.agreementLink}
                  </a>
               </label>
            </div>
            {state?.errors?.aggrement && (
               <p className="text-red-500 text-xs mt-1 font-medium">
                  {state.errors.aggrement[0]}
               </p>
            )}
         </div>
         <div className="mt-4">
            <SubmitButton pendingMsg={dict.creating} title={dict.submit} />
         </div>
      </form>
   )
}

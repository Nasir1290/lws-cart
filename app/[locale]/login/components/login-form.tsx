'use client'

import FormError from '@/components/ui/form-error'
import InputField from '@/components/ui/input-field'
import SubmitButton from '@/components/ui/submit-button'
import { loginUser } from '@/server-actions/login-user'
import { Locale } from '@/types/i18n'
import { Lang_Login } from '@/types/lang/login'
import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'

interface Props {
   locale: Locale
   dict: Lang_Login
}

export default function LoginForm({ locale, dict }: Props) {
   const [state, formAction] = useFormState(loginUser, { message: '' })
   const searchParams = useSearchParams()
   const redirectTo = searchParams.get('_redirect')

   return (
      <form action={formAction} autoComplete="off">
         <div className="space-y-2">
            <FormError message={state?.message} />
            <InputField
               name="email"
               label={dict.email}
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
            <input
               type="text"
               name="redirectTo"
               hidden
               value={redirectTo ? `/${locale}/${redirectTo}` : `/${locale}`}
            />
            <input type="text" name="locale" hidden value={locale} />
         </div>
         <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
               <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
               />
               <label
                  htmlFor="remember"
                  className="text-gray-600 ml-3 cursor-pointer"
               >
                  {dict.remember}
               </label>
            </div>
            <a href="#" className="text-primary">
               {dict.forgotPassword}
            </a>
         </div>
         <div className="mt-4">
            <SubmitButton title={dict.login} pendingMsg={dict.connecting} />
         </div>
      </form>
   )
}

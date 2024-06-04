import { auth } from '@/auth'
import { Locale } from '@/types/i18n'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import SocialLoginButton from '../login/components/social-login-button'
import RegisterForm from './components/register-form'

export const metadata: Metadata = {
   title: 'Register at LWSKart - Your Ultimate Shopping Destination',
   description:
      'Create an account at LWSKart and unlock exclusive benefits. Enjoy personalized shopping experiences, special discounts, and priority access to new arrivals. Sign up now and start shopping!',
}

interface Props {
   params: {
      locale: Locale
   }
}

export default async function Register({ params: { locale } }: Props) {
   const session = await auth()
   if (session) redirect(`/${locale}`)
   const bangla = await import('./components/bn.json')
   const english = await import('./components/en.json')
   const dict = locale === 'bn' ? bangla : english

   return (
      <div className="contain py-16">
         <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">
               {dict.createAnAccount}
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
               {dict.registerForNewCustomer}
            </p>
            <RegisterForm locale={locale} dict={dict.default} />
            <SocialLoginButton dict={dict.default.social} />
            <p className="mt-4 text-center text-gray-600">
               {dict.alreadyHaveAccount}{' '}
               <Link href={`/${locale}/login`} className="text-primary">
                  {dict.loginNow}
               </Link>
            </p>
         </div>
      </div>
   )
}

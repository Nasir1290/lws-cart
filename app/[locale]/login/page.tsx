import { auth } from '@/auth'
import { Locale } from '@/types/i18n'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import LoginForm from './components/login-form'
import SocialLoginButton from './components/social-login-button'

export const metadata: Metadata = {
   title: 'Login to LWSKart - Your One-Stop Online Shop',
   description:
      'Login to LWSKart and access your account securely. Enjoy personalized recommendations, order tracking, and seamless checkout. Shop now for amazing deals and enjoy fast delivery!',
}

interface Props {
   params: {
      locale: Locale
   }
}

export default async function Login({ params: { locale } }: Props) {
   const session = await auth()
   if (session) redirect(`/${locale}`)
   const bangla = await import('./components/bn.json')
   const english = await import('./components/en.json')
   const dict = locale === 'bn' ? bangla : english

   return (
      <div className="contain py-16">
         <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">
               {dict.login}
            </h2>
            <p className="text-gray-600 mb-6 text-sm">{dict.welcome}</p>
            <LoginForm dict={dict.default} locale={locale} />
            <SocialLoginButton locale={locale} dict={dict.default.social} />
            <p className="mt-4 text-center text-gray-600">
               {dict.dontHaveAccount}{' '}
               <Link href={`/${locale}/register`} className="text-primary">
                  {dict.register}
               </Link>
            </p>
         </div>
      </div>
   )
}

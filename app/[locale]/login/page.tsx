import { auth } from '@/auth'
import { Locale } from '@/types/i18n'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import LoginForm from './components/login-form'
import SocialLoginButton from './components/social-login-button'

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
            <SocialLoginButton dict={dict.default.social} />
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

'use client'

import { signInGoogle } from '@/server-actions/siginin-google'
import { signInFacebook } from '@/server-actions/signin-facebook'
import { Locale } from '@/types/i18n'
import { Lang_Social_login } from '@/types/lang/social-login'
import { useSearchParams } from 'next/navigation'

interface Props {
   dict: Lang_Social_login
   locale: Locale
}

export default function SocialLoginButton({ dict, locale }: Props) {
   const searchParams = useSearchParams()
   const _redirect = searchParams.get('_redirect')
   const action = searchParams.get('action')
   const actionid = searchParams.get('actionid')
   const redirectTo = _redirect
      ? action && actionid
         ? `/${_redirect}?action=${action}&actionid=${actionid}`
         : `/${_redirect}`
      : action && actionid
        ? `/${locale}?action=${action}&actionid=${actionid}`
        : `/${locale}`

   const facebookSigninAction = signInFacebook.bind(null, redirectTo)
   const googleSigninAction = signInGoogle.bind(null, { redirectTo })

   return (
      <>
         <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
               {dict.orLoginWith}
            </div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
         </div>
         <div className="mt-4 flex gap-4">
            <form action={facebookSigninAction} className="w-1/2">
               <button
                  type="submit"
                  className="w-full py-2 text-center text-white rounded capitalize font-roboto font-medium text-sm hover:bg-[#0861ee] flex justify-center items-center gap-3 bg-[#1877f2] px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
               >
                  <svg
                     aria-hidden="true"
                     fill="currentColor"
                     className="h-5 w-5"
                     xmlns="http://www.w3.org/2000/svg"
                     height="1em"
                     viewBox="0 0 512 512"
                  >
                     <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                     {dict.facebook}
                  </span>
               </button>
            </form>
            <form action={googleSigninAction} className="w-1/2">
               <button
                  type="submit"
                  className="w-full py-2 text-center text-black bg-white rounded capitalize font-roboto font-medium text-sm hover:bg-black/5 flex justify-center items-center gap-3 px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F] ring-inset ring-1 ring-[#d1d5db]"
               >
                  <svg
                     aria-hidden="true"
                     fill="currentColor"
                     className="h-5 w-5"
                     xmlns="http://www.w3.org/2000/svg"
                     width="705.6"
                     viewBox="0 0 186.69 190.5"
                  >
                     <g transform="translate(1184.583 765.171)">
                        <path
                           clipPath="none"
                           mask="none"
                           d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                           fill="#4285f4"
                        />
                        <path
                           clipPath="none"
                           mask="none"
                           d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                           fill="#34a853"
                        />
                        <path
                           clipPath="none"
                           mask="none"
                           d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                           fill="#fbbc05"
                        />
                        <path
                           d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                           fill="#ea4335"
                           clipPath="none"
                           mask="none"
                        />
                     </g>
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                     {dict.google}
                  </span>
               </button>
            </form>
         </div>
      </>
   )
}

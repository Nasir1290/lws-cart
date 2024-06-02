import logo from '@/public/assets/images/logo.svg'
import { Locale } from '@/types/i18n'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'

export default async function Footer({ locale }: { locale: Locale }) {
   const bangla = await import('./bn.json')
   const english = await import('./en.json')
   const dict = locale === 'bn' ? bangla : english

   return (
      <footer className="border-t border-gray-100 bg-white pb-12 pt-16 print:hidden">
         <div className="container grid grid-cols-3">
            <div className="col-span-1 mr-2 space-y-8">
               <Image src={logo} alt="logo" className="w-40" />
               <div className="mr-2">
                  <p className="text-sm text-gray-500">{dict.desc}</p>
               </div>
               <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                     <FaFacebook />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                     <FaInstagram />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                     <FaTwitter />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                     <FaGithub />
                  </a>
               </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-8">
               <div className="grid grid-cols-2 gap-8">
                  <div>
                     <h3 className="text-base font-semibold uppercase tracking-wider text-gray-400">
                        {dict.CustomerService.title}
                     </h3>
                     <div className="mt-4 space-y-4">
                        <Link
                           href={dict.CustomerService.ShippingInfo.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.CustomerService.ShippingInfo.linkTitle}
                        </Link>
                        <Link
                           href={dict.CustomerService.ReturnPolicy.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.CustomerService.ReturnPolicy.linkTitle}
                        </Link>
                        <Link
                           href={dict.CustomerService.FAQ.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.CustomerService.FAQ.linkTitle}
                        </Link>
                        <Link
                           href={dict.CustomerService.ContactUs.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.CustomerService.ContactUs.linkTitle}
                        </Link>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-base font-semibold uppercase tracking-wider text-gray-400">
                        {dict.Shop.title}
                     </h3>
                     <div className="mt-4 space-y-4">
                        <Link
                           href={dict.Shop.BestSellers.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.Shop.BestSellers.linkTitle}
                        </Link>
                        <Link
                           href={dict.Shop.GiftCards.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.Shop.GiftCards.linkTitle}
                        </Link>
                        <Link
                           href={dict.Shop.NewArrivals.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.Shop.NewArrivals.linkTitle}
                        </Link>
                        <Link
                           href={dict.Shop.Sales.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.Shop.Sales.linkTitle}
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div>
                     <h3 className="text-base font-semibold uppercase tracking-wider text-gray-400">
                        {dict.AboutUs.title}
                     </h3>
                     <div className="mt-4 space-y-4">
                        <Link
                           href={dict.AboutUs.Careers.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.AboutUs.Careers.linkTitle}
                        </Link>
                        <Link
                           href={dict.AboutUs.OurStory.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.AboutUs.OurStory.linkTitle}
                        </Link>
                        <Link
                           href={dict.AboutUs.PrivacyPolicy.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.AboutUs.PrivacyPolicy.linkTitle}
                        </Link>
                        <Link
                           href={dict.AboutUs.TermsOfService.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.AboutUs.TermsOfService.linkTitle}
                        </Link>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-base font-semibold uppercase tracking-wider text-gray-400">
                        {dict.connectUs.title}
                     </h3>
                     <div className="mt-4 space-y-4">
                        <Link
                           href={dict.connectUs.Facebook.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.connectUs.Facebook.linkTitle}
                        </Link>
                        <Link
                           href={dict.connectUs.Instagram.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.connectUs.Instagram.linkTitle}
                        </Link>
                        <Link
                           href={dict.connectUs.Twitter.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.connectUs.Twitter.linkTitle}
                        </Link>
                        <Link
                           href={dict.connectUs.Pinterest.href}
                           className="block text-sm text-gray-500 hover:text-gray-900"
                        >
                           {dict.connectUs.Pinterest.linkTitle}
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

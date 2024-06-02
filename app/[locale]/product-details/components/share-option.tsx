'use client'

import facebook from '@/public/assets/images/icons/facebook.svg'
import linkIcon from '@/public/assets/images/icons/link-solid.svg'
import whatsapp from '@/public/assets/images/icons/whatsapp.svg'
import x from '@/public/assets/images/icons/x.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ShareOption() {
   const pathname = usePathname()
   const shareURL =
      process.env.NODE_ENV === 'development'
         ? `${process.env.NEXT_PUBLIC_DEV_URL}${pathname}`
         : `${process.env.NEXT_PUBLIC_PROD_URL}${pathname}`

   return (
      <div className="flex flex-col fixed top-1/2 -translate-y-1/2 right-0 my-4 z-50">
         <Link
            title="Share to Facebook"
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`}
            className="border w-12 h-12 border-transparent hover:border-blue-500 flex items-center justify-center rounded-full"
         >
            <Image className="w-6" src={facebook} alt="link-Icon" />
         </Link>
         <Link
            title="Share to Twitter"
            target="_blank"
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
               shareURL,
            )}&text=Check out this cool product now! #LWSKart #Shopping
      `}
            className="border w-12 h-12 border-transparent hover:border-black/50 rounded-full flex items-center justify-center "
         >
            <Image className="w-6" src={x} alt="link-Icon" />
         </Link>
         <Link
            title="Share to Whatsapp"
            target="_blank"
            href={`whatsapp://send?text=${encodeURIComponent(
               'Check out this cool recipe now!' + ' - ' + shareURL,
            )}`}
            className="border w-12 h-12 border-transparent hover:border-green-500 rounded-full flex items-center justify-center"
         >
            <Image className="w-6" src={whatsapp} alt="link-Icon" />
         </Link>
         <button
            onClick={async () => {
               try {
                  await navigator.clipboard.writeText(shareURL)
                  toast.success('Shareable URL Copied!')
               } catch (error) {
                  toast.success('Failed to Copy sharable URL')
               }
            }}
            title="Copy URL"
            type="button"
            className="border w-12 h-12 border-transparent hover:border-black/70 rounded-full flex items-center justify-center"
         >
            <Image className="w-6" src={linkIcon} alt="link-Icon" />
         </button>
      </div>
   )
}

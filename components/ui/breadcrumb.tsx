import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import { TiHome } from 'react-icons/ti'

export default function Breadcrumb({ current }: { current: string }) {
   return (
      <div className="container py-4 flex items-center gap-3">
         <Link href="/" className="text-primary text-base">
            <TiHome className="text-xl" />
         </Link>
         <span className="text-sm text-gray-400">
            <IoIosArrowForward className="text-xl" />
         </span>
         <p className="text-gray-600 font-medium">{current}</p>
      </div>
   )
}

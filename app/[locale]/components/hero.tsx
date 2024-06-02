import { Lang_Home } from '@/types/lang/home'
import Link from 'next/link'

interface Props {
   dict: Lang_Home
}

export default function HeroBanner({ dict }: Props) {
   return (
      <div className="bg-banner bg-cover bg-no-repeat bg-center py-36">
         <div className="container">
            <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
               {dict.heroBanner.heading}
            </h1>
            <p>{dict.heroBanner.description}</p>
            <div className="mt-12">
               <Link
                  href="/shop"
                  className="bg-primary border border-primary text-white px-8 py-3 font-medium 
               rounded-md hover:bg-transparent hover:text-primary"
               >
                  {dict.heroBanner.button}
               </Link>
            </div>
         </div>
      </div>
   )
}

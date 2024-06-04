'use client'

import errorIcon from '@/public/assets/images/error-message.png'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
   reset: () => void
}

export default function NotFound({ reset }: Props) {
   return (
      <section className="bg-white">
         <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
            <div className="flex flex-col items-center max-w-sm mx-auto text-center">
               <Image src={errorIcon} alt="404" className="w-16" />
               <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                  Something went wrong!
               </h1>
               <p className="mt-4 text-gray-500">
                  Sorry, an unexpected error has occurred.
               </p>

               <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                  <button
                     onClick={() => reset()}
                     className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-gray-800 rounded-lg shrink-0 sm:w-auto hover:bg-gray-800/80"
                  >
                     Refresh
                  </button>
                  <Link
                     href={'/'}
                     className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-primary rounded-lg shrink-0 sm:w-auto hover:bg-primary/80"
                  >
                     Take me home
                  </Link>
               </div>
            </div>
         </div>
      </section>
   )
}

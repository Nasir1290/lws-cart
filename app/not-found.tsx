import errorIcon from '@/public/assets/images/error.png'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
   return (
      <section className="bg-white">
         <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
            <div className="flex flex-col items-center max-w-sm mx-auto text-center">
               <Image src={errorIcon} alt="404" className="w-16" />
               <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                  Page not found
               </h1>
               <p className="mt-4 text-gray-500">
                  The page you are looking for doesn&apos;t exist.
               </p>

               <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
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

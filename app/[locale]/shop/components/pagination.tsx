'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

export default function Pagination() {
   const searchParams = useSearchParams()
   const pathname = usePathname()
   const router = useRouter()
   const [page, setPage] = useState(Number(searchParams.get('page')) || 1)

   const handlePage = (type: 'next' | 'prev') => {
      const params = new URLSearchParams(searchParams.toString())
      if (type === 'next') {
         setPage((pre) => pre + 1)
         params.set('page', (page + 1).toString())
      } else {
         if (page > 1) {
            setPage((pre) => pre - 1)
            params.set('page', (page - 1).toString())
         }
      }
      router.push(`${pathname}?${params.toString()}`)
   }

   return (
      <div className="w-full mt-10">
         <div className="flex justify-end w-full">
            <nav className="rounded-md shadow-sm flex">
               <button
                  onClick={() => handlePage('prev')}
                  type="button"
                  className="relative inline-flex items-center rounded-l-md px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 gap-2"
               >
                  <FaChevronLeft />
                  <span>Previous</span>
               </button>
               <button
                  onClick={() => handlePage('next')}
                  type="button"
                  className="relative inline-flex items-center rounded-r-md px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 gap-2"
               >
                  <span>Next</span>
                  <FaChevronRight />
               </button>
            </nav>
         </div>
      </div>
   )
}

'use client'

import { useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'

export default function Drawer({ children }: { children: React.ReactNode }) {
   const [isOpen, setIsOpen] = useState(false)

   return (
      <>
         <div className="text-center md:hidden">
            <button
               onClick={() => setIsOpen((pre) => !pre)}
               className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block md:hidden"
               type="button"
            >
               <FaChevronLeft />
            </button>
         </div>
         <div>{isOpen && children}</div>
      </>
   )
}

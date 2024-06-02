'use client'

import { C_Category } from '@/types/category'
import { Locale } from '@/types/i18n'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import Checkbox from './checkbox'
import ColorFilter from './color-filter'
import PrizeRange from './prize-range'
import ResetForm from './reset-form'

interface Props {
   categories: C_Category[]
   locale: Locale
}

export default function Sidebar({ categories, locale }: Props) {
   const searchParams = useSearchParams()
   const paramsCategories = searchParams.getAll('category')
   const [activeCategories, setActiveCategories] = useState<string[]>([])

   return (
      <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
         <div className="divide-y divide-gray-200 space-y-5">
            {/* <ResetForm /> */}
            <div>
               <h3 className="text-gray-800 my-3 uppercase font-medium">
                  Categories
               </h3>
               <div className="space-y-2">
                  {categories?.map((category) => (
                     <Checkbox
                        activeCategories={activeCategories}
                        setActiveCategories={setActiveCategories}
                        locale={locale}
                        category={category}
                        paramsCategories={paramsCategories}
                        key={category._id}
                     />
                  ))}
               </div>
            </div>

            <PrizeRange />
            <ColorFilter locale={locale} />
         </div>
      </div>
   )
}

import { C_Category } from '@/types/category'
import { Locale } from '@/types/i18n'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'

interface Props {
   category: C_Category
   paramsCategories: string[]
   locale: Locale
   activeCategories: string[]
   setActiveCategories: Dispatch<SetStateAction<string[]>>
}

export default function Checkbox({
   category,
   paramsCategories,
   locale,
   activeCategories,
   setActiveCategories,
}: Props) {
   const router = useRouter()
   const isChecked = paramsCategories.some(
      (pc) => pc === category.category.toLowerCase(),
   )
   const searchParams = useSearchParams()

   const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         setActiveCategories([
            ...activeCategories,
            category.category.toLowerCase(),
         ])
      } else {
         setActiveCategories(
            activeCategories.filter(
               (ac) => ac !== category.category.toLowerCase(),
            ),
         )
      }
   }

   useEffect(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('category')
      activeCategories.forEach((c) => {
         params.append('category', c)
      })
      router.push(`/${locale}/shop?${params.toString()}`)
   }, [searchParams, activeCategories, locale, router])

   return (
      <div key={category._id} className="flex items-center">
         <input
            type="checkbox"
            id={category._id}
            defaultChecked={isChecked}
            onChange={handleChange}
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
         />
         <label
            htmlFor={category._id}
            className="text-gray-600 ml-3 cusror-pointer"
         >
            {category.category}
         </label>
      </div>
   )
}

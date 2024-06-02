'use client'

import { searchProducts } from '@/server-actions/search-products'
import { Locale } from '@/types/i18n'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { FiSearch } from 'react-icons/fi'

import SearchSubmitButton from './search-submit-button'

interface Props {
   dict: {
      search: string
      placeholder: string
      account: string
      cart: string
      wishlist: string
   }
   locale: Locale
}

export default function SearchBar({ dict, locale }: Props) {
   const searchParams = useSearchParams()

   const category = searchParams.getAll('category')
   const min_price = searchParams.getAll('min_price')
   const max_price = searchParams.getAll('max_price')

   const query = searchParams.get('query')

   const updatedAction = searchProducts.bind(null, {
      locale,
      searchParams: {
         category,
         min_price,
         max_price,
      },
   })

   const handleSearch = async (formData: FormData) => {
      try {
         await updatedAction(formData)
      } catch (error: any) {
         toast.error(error?.message || 'Something went wrong!')
      }
   }

   return (
      <form action={handleSearch} className="w-full max-w-xl relative flex">
         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
            <FiSearch />
         </span>
         <input
            type="text"
            name="query"
            id="search"
            defaultValue={query ? query : ''}
            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none placeholder:text-sm"
            placeholder={dict.placeholder}
         />
         <SearchSubmitButton dict={dict} />
      </form>
   )
}

'use server'

import { Locale } from '@/types/i18n'
import { redirect } from 'next/navigation'

interface Props {
   locale: Locale
   searchParams: {
      category: string[]
      min_price: string[]
      max_price: string[]
   }
}

export const searchProducts = async (
   { locale, searchParams }: Props,
   formData: FormData,
) => {
   const cate_query = searchParams.category.reduce(
      (prev, curr) => prev + `&category=${curr}`,
      '',
   )
   const min_query = searchParams.min_price.reduce(
      (prev, curr) => prev + `&min_price=${curr}`,
      '',
   )
   const max_query = searchParams.max_price.reduce(
      (prev, curr) => prev + `&max_price=${curr}`,
      '',
   )

   const query = formData.get('query')?.toString()
   if (query) {
      redirect(
         `/${locale}/shop?query=${query}${cate_query}${min_query}${max_query}`,
      )
   } else throw new Error('Please type something!')
}

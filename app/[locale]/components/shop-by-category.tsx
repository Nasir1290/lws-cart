import { getCategories } from '@/server-actions/get-categories'
import { Locale } from '@/types/i18n'
import { Lang_Home } from '@/types/lang/home'

import CategoryCard from './category-card'

interface Props {
   dict: Lang_Home
   locale: Locale
}

export default async function ShopByCategory({ dict, locale }: Props) {
   const categories = await getCategories()

   return (
      <div className="container py-16">
         <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
            {dict.shopByCategory.title}
         </h2>
         <div className="grid grid-cols-[auto,auto,auto] justify-evenly gap-3">
            {categories?.map((category) => (
               <CategoryCard
                  key={category._id}
                  locale={locale}
                  category={category}
               />
            ))}
         </div>
      </div>
   )
}

import { C_Category } from '@/types/category'
import { Locale } from '@/types/i18n'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
   category: C_Category
   locale: Locale
}

export default function CategoryCard({ category, locale }: Props) {
   return (
      <div className="group relative overflow-hidden rounded-sm">
         <div className="relative w-96 h-64">
            <Image
               fill
               src={category.thumbnail}
               alt={category.category}
               className="object-cover object-center"
            />
            <Link
               href={`/${locale}${category.href}`}
               className="absolute h-10 bottom-0 w-full group-hover:h-full flex items-center justify-center bg-black bg-opacity-40 font-roboto text-xl font-medium text-white transition-all ease-[cubic-bezier(0.87,0,0.13,1)] duration-[0.6s]"
            >
               {category.category}
            </Link>
         </div>
      </div>
   )
}

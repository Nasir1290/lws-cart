import ProductCard from '@/components/product/product-card'
import Breadcrumb from '@/components/ui/breadcrumb'
import folderIcon from '@/public/assets/images/folder.png'
import { getAllProducts } from '@/server-actions/get-all-products'
import { getCategories } from '@/server-actions/get-categories'
import { Locale } from '@/types/i18n'
import { Metadata } from 'next'
import Image from 'next/image'
import { FaChevronLeft } from 'react-icons/fa6'

import Drawer from './components/drawer'
import Sidebar from './components/sidebar'

export const metadata: Metadata = {
   title: 'Shop - Filter Products',
   description:
      'Explore a wide range of products available at LWSKart. Use advanced filtering, sorting, and searching features to find exactly what you need. Shop conveniently and discover new favorites.',
}

interface Props {
   searchParams: {
      category: string | string[]
      color: string | string[]
      min_price: string
      max_price: string
      query: string
   }
   params: {
      locale: Locale
   }
}

export default async function Shop({ searchParams, params }: Props) {
   const bangla = await import('./components/bn.json')
   const english = await import('./components/en.json')
   const dict = params.locale === 'bn' ? bangla : english

   const products = await getAllProducts({
      query: searchParams.query,
      category: searchParams.category,
      color: searchParams.color,
      min_price: searchParams.min_price,
      max_price: searchParams.max_price,
   })

   const categories = (await getCategories()) || []

   return (
      <>
         <Breadcrumb current="Shop" />
         <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
            <Drawer>
               <Sidebar
                  dict={dict.default}
                  locale={params.locale}
                  categories={categories}
                  isDrawer={true}
               />
            </Drawer>
            <Sidebar
               isDrawer={false}
               dict={dict.default}
               locale={params.locale}
               categories={categories}
            />

            {products.length > 0 ? (
               <div className="col-span-3">
                  <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                     {products.map((product) => (
                        <ProductCard
                           key={product._id}
                           product={product}
                           locale={params.locale}
                        />
                     ))}
                  </div>
                  {/* {products.length >= 9 && <Pagination />} */}
               </div>
            ) : (
               <div className="flex items-center justify-center col-span-3 h-full">
                  <div className="flex flex-col justify-center items-center gap-y-5 h-full">
                     <Image
                        className="w-20"
                        src={folderIcon}
                        alt="folder-icon"
                     />
                     <h2 className="text-2xl font-bold text-gray-500">
                        Oops! No Products Matched.
                     </h2>
                  </div>
               </div>
            )}
         </div>
      </>
   )
}

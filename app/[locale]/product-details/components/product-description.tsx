import { Lang_Product_Details } from '@/types/lang/product-details'

interface Desc {
   desc: string
   dict: Lang_Product_Details
}
export default function ProductDescription({ desc, dict }: Desc) {
   return (
      <div className="container pb-8">
         <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
            {dict.description}
         </h3>
         <div className="w-3/5 pt-6">
            <div className="text-gray-600">
               <p>{desc}</p>
            </div>
         </div>
      </div>
   )
}

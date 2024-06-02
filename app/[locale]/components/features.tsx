import deliveryVan from '@/public/assets/images/icons/delivery-van.svg'
import moneyBack from '@/public/assets/images/icons/money-back.svg'
import serviceHours from '@/public/assets/images/icons/service-hours.svg'
import { Lang_Home } from '@/types/lang/home'
import Image from 'next/image'

interface Props {
   dict: Lang_Home
}

export default async function Features({ dict }: Props) {
   return (
      <div className="container py-16">
         <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
               <Image
                  src={deliveryVan}
                  alt="Delivery"
                  className="w-12 h-12 object-contain"
               />
               <div>
                  <h4 className="font-medium capitalize text-lg">
                     {dict.features.freeShipping.title}
                  </h4>
                  <p className="text-gray-500 text-sm">
                     {dict.features.freeShipping.desc}
                  </p>
               </div>
            </div>
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
               <Image
                  src={moneyBack}
                  alt="Delivery"
                  className="w-12 h-12 object-contain"
               />
               <div>
                  <h4 className="font-medium capitalize text-lg">
                     {dict.features.moneyReturns.title}
                  </h4>
                  <p className="text-gray-500 text-sm">
                     {dict.features.moneyReturns.desc}
                  </p>
               </div>
            </div>
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
               <Image
                  src={serviceHours}
                  alt="Delivery"
                  className="w-12 h-12 object-contain"
               />
               <div>
                  <h4 className="font-medium capitalize text-lg">
                     {dict.features.support.title}
                  </h4>
                  <p className="text-gray-500 text-sm">
                     {dict.features.support.desc}
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

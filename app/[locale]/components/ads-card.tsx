import offer from '@/public/assets/images/offer.jpg'
import Image from 'next/image'

export default function AdsCard() {
   return (
      <div className="container pb-16">
         <a href="#">
            <Image
               placeholder="blur"
               src={offer}
               alt="ads"
               className="w-full"
            />
         </a>
      </div>
   )
}

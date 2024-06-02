import { Address } from '@/types/address'
import Link from 'next/link'
import { FaRegEdit } from 'react-icons/fa'

interface Props {
   address?: Address
}

export default function ShippingAddress({ address }: Props) {
   return (
      <div className="bg-emerald-700/5 p-4 rounded-md">
         <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Shipping Address</h3>
            <Link href="/edit/shipping-address">
               <FaRegEdit className="text-lg" />
            </Link>
         </div>
         <div
            className={`[&>p]:px-2 [&>p]:py-1 ${address ? '' : 'opacity-40'}`}
         >
            <p className="text-gray-600 bg-black/5">
               {address?.firstName && address?.lastName
                  ? address.firstName + ' ' + address.lastName
                  : 'Name'}
            </p>
            <p className="text-gray-600">
               {address?.address && address.city && address.region
                  ? `${address.address}, ${address.city}, ${address.region}`
                  : 'Address'}
            </p>
            <p className="text-gray-600 bg-black/5">
               {address?.phone ? address.phone : 'Phone'}
            </p>
            <p className="text-gray-600">
               {address?.email ? address.email : 'Email'}
            </p>
         </div>
      </div>
   )
}

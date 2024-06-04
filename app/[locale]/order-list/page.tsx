import { auth } from '@/auth'
import Breadcrumb from '@/components/ui/breadcrumb'
import folderIcon from '@/public/assets/images/folder.png'
import { getOrderList } from '@/server-actions/get-order-list'
import { Locale } from '@/types/i18n'
import { getDateFormat } from '@/utils/getDateFormat'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
   title: 'Order History - LWSKart',
   description:
      'View your order history and track the status of your purchases at LWSKart. Stay updated on delivery schedules and manage your shopping history conveniently.',
}

interface Props {
   params: {
      locale: Locale
   }
}

export default async function Orderlist({ params: { locale } }: Props) {
   const session = await auth()
   if (!session) redirect('/login?_redirect=order-list')
   const orders = await getOrderList()

   return (
      <>
         <Breadcrumb current="Order-list" />
         <div>
            <div className="container mx-auto p-4 min-h-[calc(100vh-130px)]">
               <h1 className="text-2xl font-bold mb-4">Recent Orders</h1>
               {orders?.length && orders?.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg overflow-hidden">
                     <thead className="bg-gray-100">
                        <tr>
                           <th className="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                              Invoice
                           </th>
                           <th className="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                              Date
                           </th>
                           <th className="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                              Status
                           </th>
                           <th className="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                              Total Amount
                           </th>
                           <th className="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => {
                           const totalAmount = order.products.reduce(
                              (prev, curr) => {
                                 const discountPrice =
                                    (curr.price * (100 - curr.discount)) / 100
                                 return prev + discountPrice * curr.quantity
                              },
                              0,
                           )
                           return (
                              <tr key={order._id}>
                                 <td className="px-6 py-6 whitespace-nowrap font-medium text-gray-600">
                                    #{order.invoice}
                                 </td>
                                 <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                                    {getDateFormat(order.createdAt)}
                                 </td>
                                 <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                                    <code className="bg-green-200 rounded-xl py-1 px-2">
                                       Pending
                                    </code>
                                 </td>
                                 <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                                    BDT {Math.round(totalAmount)}
                                 </td>
                                 <td className="px-6 py-6 whitespace-nowrap text-sm font-medium flex gap-3">
                                    <Link
                                       href={`/${locale}/invoice/${order._id}`}
                                       className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
                                    >
                                       View Details
                                    </Link>
                                 </td>
                              </tr>
                           )
                        })}
                     </tbody>
                  </table>
               ) : (
                  <div className="flex items-center justify-center col-span-3 h-full">
                     <div className="flex flex-col justify-center items-center gap-y-5 h-full">
                        <Image
                           className="w-20"
                           src={folderIcon}
                           alt="folder-icon"
                        />
                        <h2 className="text-2xl font-bold text-gray-500">
                           Oops! You haven&apos;t placed any order yet.
                        </h2>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   )
}

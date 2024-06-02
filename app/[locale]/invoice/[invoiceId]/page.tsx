import { auth } from '@/auth'
import Breadcrumb from '@/components/ui/breadcrumb'
import { getSingleOrder } from '@/server-actions/getSingleOrder'
import { getDateFormat } from '@/utils/getDateFormat'
import { redirect } from 'next/navigation'

import InvoiceCard from './components/invoice-card'

interface Props {
   params: {
      invoiceId: string
   }
}

export default async function Invoice({ params: { invoiceId } }: Props) {
   const session = await auth()
   if (!session) redirect(`/login?_redirect=invoice/${invoiceId}`)

   const order = await getSingleOrder(invoiceId)

   const subTotal = order.products.reduce(
      (prev, curr) => prev + curr.quantity * curr.price,
      0,
   )

   const discountTotal = order.products.reduce((prev, curr) => {
      const discountPrice = (curr.quantity * (curr.price * curr.discount)) / 100
      return prev + discountPrice
   }, 0)

   return (
      <>
         <Breadcrumb current="Invoice" />
         <div>
            <InvoiceCard invoiceId={order.invoice}>
               <div className="bg-white rounded-md md:p-16 p-10 container">
                  <div className="flex flex-wrap items-center justify-between gap-6">
                     <div>
                        <span className="text-lg font-bold">Bill to:</span>
                        <div className="mt-4 px-4 border-s-primary border-s-4">
                           <h4 className="text-base font-bold">
                              {order.shippingAddress.firstName +
                                 ' ' +
                                 order.shippingAddress.lastName}
                           </h4>
                           <p className="text-sm font-medium tracking-widest my-1">
                              {order.shippingAddress.address}
                           </p>
                           <p className="text-sm font-medium tracking-widest my-1">
                              {order.shippingAddress.city},{' '}
                              {order.shippingAddress.region}
                           </p>
                           <p className="text-sm font-medium tracking-widest my-1">
                              {order.shippingAddress.email}
                           </p>
                        </div>
                     </div>
                     <div className="flex flex-col items-end">
                        <h4 className="text-base font-bold">LWSKart</h4>
                        <p className="text-sm font-medium tracking-widest my-1">
                           Bijoy Shoroni, Arambag
                        </p>
                        <p className="text-sm font-medium my-1">
                           Dhaka, Bangladesh
                        </p>
                        <p className="text-sm font-medium my-1">
                           lwskart@bedona.com
                        </p>
                     </div>
                  </div>

                  <div className="flex items-center justify-between my-10">
                     <h4 className="text-5xl font-semibold uppercase tracking-widest">
                        Invoice{' '}
                        <span className="text-primary">#{order.invoice}</span>
                     </h4>
                     <div>
                        <p className="text-base font-semibold">
                           <span className="text-sm">
                              {getDateFormat(order.createdAt)}
                           </span>
                        </p>
                     </div>
                  </div>

                  <div className="overflow-x-auto">
                     <table className="border-collapse table-auto w-full text-sm mt-10 whitespace-pre">
                        <thead>
                           <tr className="bg-gray-100">
                              <th className="p-4 border border-e-0 uppercase text-lg font-medium text-start">
                                 Product Description
                              </th>
                              <th className="p-4 border-y uppercase text-lg font-medium ">
                                 Price
                              </th>
                              <th className="p-4 pe-7 border-y uppercase text-lg font-medium">
                                 Qty
                              </th>
                              <th className="p-4 border border-s-0 uppercase text-lg font-medium">
                                 Total
                              </th>
                           </tr>
                        </thead>
                        <tbody className="bg-white">
                           {order.products.map((product) => (
                              <tr key={product._id}>
                                 <td className="p-5 text-base font-medium border">
                                    {product.name}
                                 </td>
                                 <td className="p-5 text-base font-medium border text-center">
                                    BDT {product.price}{' '}
                                    <span className="text-sm text-gray-400">
                                       ({product.discount}% OFF)
                                    </span>
                                 </td>
                                 <td className="p-5 text-base font-medium border text-center">
                                    {product.quantity}
                                 </td>
                                 <td className="p-5 text-base font-medium border text-center">
                                    BDT {product.price * product.quantity}
                                 </td>
                              </tr>
                           ))}
                           <tr>
                              <td className="p-5" colSpan={5}></td>
                           </tr>
                           <tr className="bg-gray-100">
                              <td
                                 colSpan={4}
                                 className="p-1 ps-5 text-base font-medium border"
                              >
                                 comments
                              </td>
                           </tr>
                           <tr>
                              <td
                                 colSpan={3}
                                 rowSpan={3}
                                 className="p-5 text-xl text-[#393939] font-semibold border  text-wrap"
                              >
                                 Thank you for shopping with us! <br />{' '}
                                 <span className="text-sm font-medium">
                                    Life&apos;s too short to wear boring stuff -
                                    <br /> so rock your new gear and own the
                                    day!
                                 </span>
                              </td>
                              <td className="p-5 text-base font-medium border text-center flex justify-between">
                                 <b>Subtotal:</b>
                                 <span>BDT {Math.round(subTotal)}</span>
                              </td>
                           </tr>
                           <tr>
                              <td className="p-5 text-base font-medium border text-center flex justify-between">
                                 <b>Discount:</b>{' '}
                                 <span>BDT {Math.round(discountTotal)}</span>
                              </td>
                           </tr>
                           <tr>
                              <td className="p-5 text-base font-medium border text-center text-emerald-500 flex justify-between">
                                 <b>Total:</b>
                                 <span>
                                    BDT {Math.round(subTotal - discountTotal)}
                                 </span>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </InvoiceCard>
         </div>
      </>
   )
}

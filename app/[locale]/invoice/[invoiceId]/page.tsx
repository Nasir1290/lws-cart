import { auth } from '@/auth'
import Breadcrumb from '@/components/ui/breadcrumb'
import { getSingleOrder } from '@/server-actions/getSingleOrder'
import { Locale } from '@/types/i18n'
import { convertNumEnToBn } from '@/utils/convertNumEnToBn'
import { getDateFormat } from '@/utils/getDateFormat'
import { redirect } from 'next/navigation'

import InvoiceCard from './components/invoice-card'

interface Props {
   params: {
      invoiceId: string
      locale: Locale
   }
}

export default async function Invoice({
   params: { invoiceId, locale },
}: Props) {
   const session = await auth()
   if (!session) redirect(`/${locale}/login?_redirect=invoice/${invoiceId}`)
   const bangla = await import('./components/bn.json')
   const english = await import('./components/en.json')
   const dict = locale === 'bn' ? bangla : english

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
         <Breadcrumb current={dict.invoice} />
         <div>
            <InvoiceCard
               dict={{
                  print: dict.default.print,
                  download: dict.default.download,
               }}
               invoiceId={order.invoice}
            >
               <div className="bg-white rounded-md md:p-16 p-10 container print:p-0 print:mt-5">
                  <div className="flex flex-wrap items-center justify-between gap-6">
                     <div>
                        <span className="text-lg font-bold">
                           {dict.billTo}:
                        </span>
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
                     <h4 className="text-5xl font-semibold uppercase tracking-widest print:text-2xl">
                        {dict.invoice}{' '}
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
                              <th className="p-4 print:p-2 print:text-xs border border-e-0 uppercase text-lg font-medium text-start">
                                 {dict.productDesc}
                              </th>
                              <th className="p-4 print:p-2 print:text-xs border-y uppercase text-lg font-medium ">
                                 {dict.price}
                              </th>
                              <th className="p-4 print:p-2 print:text-xs pe-7 border-y uppercase text-lg font-medium">
                                 {dict.quantity}
                              </th>
                              <th className="p-4 print:p-2 print:text-xs border border-s-0 uppercase text-lg font-medium">
                                 {dict.total}
                              </th>
                           </tr>
                        </thead>
                        <tbody className="bg-white">
                           {order.products.map((product) => (
                              <tr key={product._id}>
                                 <td className="p-5 print:text-xs print:p-2 text-base font-medium border">
                                    {product.name}
                                 </td>
                                 <td className="p-5 print:text-xs print:p-2 text-base font-medium border text-center">
                                    {dict.currency}{' '}
                                    {locale === 'bn'
                                       ? convertNumEnToBn(product.price)
                                       : product.price}{' '}
                                    <span className="text-sm text-gray-400">
                                       (
                                       {locale === 'bn'
                                          ? convertNumEnToBn(product.discount)
                                          : product.discount}
                                       % {dict.off})
                                    </span>
                                 </td>
                                 <td className="p-5 print:text-xs print:p-2 text-base font-medium border text-center">
                                    {locale === 'bn'
                                       ? convertNumEnToBn(product.quantity)
                                       : product.quantity}
                                 </td>
                                 <td className="p-5 print:text-xs print:p-2 text-base font-medium border text-center">
                                    {dict.currency}{' '}
                                    {locale === 'bn'
                                       ? convertNumEnToBn(
                                            product.price * product.quantity,
                                         )
                                       : product.price * product.quantity}
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
                                 {dict.comments}
                              </td>
                           </tr>
                           <tr>
                              <td
                                 colSpan={3}
                                 rowSpan={3}
                                 className="p-5 print:p-2 print:text-sm text-xl text-[#393939] font-semibold border  text-wrap"
                              >
                                 {dict.comment1} <br />{' '}
                                 <span className="text-sm font-medium">
                                    {dict.comment2}
                                    <br /> {dict.comment3}
                                 </span>
                              </td>
                              <td className="p-5 print:p-2 print:text-xs text-base font-medium border text-center flex justify-between">
                                 <b>{dict.subTotal}:</b>
                                 <span>
                                    {dict.currency}{' '}
                                    {locale === 'bn'
                                       ? convertNumEnToBn(Math.round(subTotal))
                                       : Math.round(subTotal)}
                                 </span>
                              </td>
                           </tr>
                           <tr>
                              <td className="p-5 print:p-2 print:text-xs text-base font-medium border text-center flex justify-between">
                                 <b>{dict.discount}:</b>{' '}
                                 <span>
                                    {dict.currency}{' '}
                                    {locale === 'bn'
                                       ? convertNumEnToBn(
                                            Math.round(discountTotal),
                                         )
                                       : Math.round(discountTotal)}
                                 </span>
                              </td>
                           </tr>
                           <tr>
                              <td className="p-5 print:p-2 print:text-xs text-base font-medium border text-center text-emerald-500 flex justify-between">
                                 <b>{dict.total}:</b>
                                 <span>
                                    {dict.currency}{' '}
                                    {locale === 'bn'
                                       ? convertNumEnToBn(
                                            Math.round(
                                               subTotal - discountTotal,
                                            ),
                                         )
                                       : Math.round(subTotal - discountTotal)}
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

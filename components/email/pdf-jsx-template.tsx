import { PDF_JSX_Order } from '@/types/order'
import { getDateFormat } from '@/utils/getDateFormat'
import { CSS, Tailwind } from '@fileforge/react-print'

export default function PdfjsxTemplate({ order }: { order: PDF_JSX_Order }) {
   const subTotal = order.products.reduce(
      (prev, curr) => prev + curr.quantity * curr.price,
      0,
   )

   const discountTotal = order.products.reduce((prev, curr) => {
      const discountPrice = (curr.quantity * (curr.price * curr.discount)) / 100
      return prev + discountPrice
   }, 0)

   return (
      <Tailwind
         config={{
            theme: {
               container: {
                  center: true,
                  padding: '1rem',
               },
               extend: {
                  colors: {
                     primary: '#fd3d57',
                  },
               },
            },
         }}
      >
         <>
            <CSS>{`@page {size: A4;margin-top:1cm;margin-right:1cm;margin-left:1cm;margin-bottom:1cm;`}</CSS>
            <div className="bg-white rounded-md container print:p-0 print:mt-5">
               <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                     <span className="text-lg font-bold">Bill To:</span>
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
                  <h4 className="text-4xl font-semibold uppercase tracking-widest print:text-2xl">
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
                           <th className="p-3 border border-e-0 uppercase  font-medium text-start">
                              Product Description
                           </th>
                           <th className="p-3 border-y uppercase  font-medium ">
                              Price
                           </th>
                           <th className="p-3 pe-7 border-y uppercase  font-medium">
                              Quantity
                           </th>
                           <th className="p-3 border border-s-0 uppercase  font-medium">
                              Total
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white">
                        {order.products.map((product) => (
                           <tr key={product._id}>
                              <td className="p-3 text-base font-medium border">
                                 {product.name}
                              </td>
                              <td className="p-3 text-base font-medium border text-center">
                                 BDT {product.price}{' '}
                                 <span className="text-sm text-gray-400">
                                    ({product.discount}% OFF)
                                 </span>
                              </td>
                              <td className="p-3 text-base font-medium border text-center">
                                 {product.quantity}
                              </td>
                              <td className="p-3 text-base font-medium border text-center">
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
                              className="p-3 ps-5 text-base font-medium border"
                           >
                              Comments
                           </td>
                        </tr>
                        <tr>
                           <td
                              colSpan={3}
                              rowSpan={3}
                              className="p-3 print:text-sm text-xl text-[#393939] font-semibold border  text-wrap"
                           >
                              Thanks for shopping with us.
                           </td>
                           <td className="p-3 text-base font-medium border text-center flex justify-between">
                              <b>Subtotal:</b>
                              <span>BDT {Math.round(subTotal)}</span>
                           </td>
                        </tr>
                        <tr>
                           <td className="p-3 text-base font-medium border text-center flex justify-between">
                              <b>Discount:</b>{' '}
                              <span>BDT {Math.round(discountTotal)}</span>
                           </td>
                        </tr>
                        <tr>
                           <td className="p-3 text-base font-medium border text-center text-emerald-500 flex justify-between">
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
         </>
      </Tailwind>
   )
}

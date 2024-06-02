import { PDF_Order } from '@/types/order'
import { Cartlist_Product } from '@/types/product'
import { getDateFormat } from '@/utils/getDateFormat'

const getTableRow = (product: Cartlist_Product) => {
   return `
<tr>
   <td class="border p-5 text-base font-medium">
      ${product.name}
   </td>
   <td class="border p-5 text-center text-base font-medium">
      BDT ${product.price}
      <span class="text-sm text-gray-400">
         (${product.discount}% OFF)
      </span>
   </td>
   <td class="border p-5 text-center text-base font-medium">
      ${product.quantity}
   </td>
   <td class="border p-5 text-center text-base font-medium">
      BDT ${product.price * product.quantity}
   </td>
</tr>`
}

export const generatePDFHtml = (order: PDF_Order) => {
   const subTotal = order.products.reduce(
      (prev, curr) => prev + curr.quantity * curr.price,
      0,
   )

   const discountTotal = order.products.reduce((prev, curr) => {
      const discountPrice = (curr.quantity * (curr.price * curr.discount)) / 100
      return prev + discountPrice
   }, 0)

   const rowItems = order.products.reduce(
      (prev, curr) => prev + getTableRow(curr),
      '',
   )

   return `
<!doctype html>
   <html lang="en">
      <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <title>Invoice</title>
         <script src="https://cdn.tailwindcss.com"></script>
         <script>
            tailwind.config = {
               theme: {
                  screen: {
                     sm: '576px',
                     md: '768px',
                     lg: '992px',
                     xl: '1200px',
                  },
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
            }
         </script>
      </head>
      <body>
         <div>
            <div class="container rounded-md bg-white p-10 md:p-16">
               <div class="flex flex-wrap items-center justify-between gap-6">
                  <div>
                     <span class="text-lg font-bold">Bill to:</span>
                     <div class="mt-4 border-s-4 border-s-primary px-4 italic">
                        <h4 class="text-base font-bold">
                           ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}
                        </h4>
                        <p class="my-1 text-sm font-medium tracking-widest">
                           ${order.shippingAddress.address}
                        </p>
                        <p class="my-1 text-sm font-medium tracking-widest">
                           ${order.shippingAddress.city}, ${order.shippingAddress.region}
                        </p>
                        <p class="my-1 text-sm font-medium tracking-widest">
                           ${order.shippingAddress.email}
                        </p>
                     </div>
                  </div>
                  <div class="flex flex-col items-end">
                     <h4 class="text-base font-bold">LWSKart</h4>
                     <p class="my-1 text-sm font-medium tracking-widest">
                        Bijoy Shoroni, Arambag
                     </p>
                     <p class="my-1 text-sm font-medium">Dhaka, Bangladesh</p>
                     <p class="my-1 text-sm font-medium">lwskart@bedona.com</p>
                  </div>
               </div>
               <div class="my-10 flex items-center justify-between">
                  <h4 class="text-5xl font-semibold uppercase tracking-widest">
                     Invoice
                     <span class="text-primary">#${order.invoice}</span>
                  </h4>
                  <div>
                     <p class="text-base font-semibold">
                        <span class="text-sm">${getDateFormat(order.createdAt)}</span>
                     </p>
                  </div>
               </div>
               <div class="overflow-x-auto">
                  <table class="mt-10 w-full table-auto border-collapse text-sm">
                     <thead>
                        <tr class="bg-gray-100">
                           <th
                              class="border border-e-0 p-4 text-start font-medium uppercase"
                           >
                              Product Description
                           </th>
                           <th class="border-y p-4 font-medium uppercase">
                              Price
                           </th>
                           <th class="border-y p-4 pe-7 font-medium uppercase">
                              Qty
                           </th>
                           <th class="border border-s-0 p-4 font-medium uppercase">
                              Total
                           </th>
                        </tr>
                     </thead>
                     <tbody class="bg-white">
                        ${rowItems}
                        <tr>
                           <td class="p-5" colspan="5"></td>
                        </tr>
                        <tr class="bg-gray-100">
                           <td
                              colspan="4"
                              class="border p-1 ps-5 text-base font-medium"
                           >
                              Comments
                           </td>
                        </tr>
                        <tr>
                           <td
                              colspan="3"
                              rowspan="3"
                              class="text-wrap border p-5 text-xl font-semibold text-[#393939]"
                           >
                              Thank you for shopping with us!
                           </td>
                           <td
                              class="flex justify-between border p-5 text-center text-base font-medium"
                           >
                              <b>Subtotal:</b><span>BDT ${Math.round(subTotal)}</span>
                           </td>
                        </tr>
                        <tr>
                           <td
                              class="flex justify-between border p-5 text-center text-base font-medium"
                           >
                              <b>Discount:</b>
                              <span>BDT ${Math.round(discountTotal)}</span>
                           </td>
                        </tr>
                        <tr>
                           <td
                              class="flex justify-between border p-5 text-center text-base font-medium text-emerald-500"
                           >
                              <b>Total:</b><span>BDT ${Math.round(subTotal) - Math.round(discountTotal)}</span>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </body>
   </html>`
}

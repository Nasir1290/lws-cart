import FormError from '@/components/ui/form-error'
import SubmitButton from '@/components/ui/submit-button'
import { Cartlist_Product } from '@/types/product'

interface Props {
   totalPrice: number
   products: Cartlist_Product[]
   error?: string
}

export default function OrderSummary({ products, totalPrice, error }: Props) {
   return (
      <div className="col-span-4 border border-gray-200 p-4 rounded">
         <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            order summary
         </h4>
         <div className="space-y-2">
            {products.map((product) => {
               const discountPrice =
                  (product.price * (100 - product.discount)) / 100
               return (
                  <div key={product._id} className="flex justify-between">
                     <div>
                        <h5 className="text-gray-800 font-medium">
                           {product.name}
                        </h5>
                        <p className="text-sm text-gray-600">
                           Price: BDT {Math.round(discountPrice)}
                        </p>
                     </div>
                     <p className="text-gray-600">{`x${product.quantity}`}</p>
                     <p className="text-gray-800 font-medium">
                        BDT {Math.round(product.quantity * discountPrice)}
                     </p>
                  </div>
               )
            })}
         </div>

         <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>Subtotal</p>
            <p>BDT {Math.round(totalPrice)}</p>
         </div>

         <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>Shipping</p>
            <p>Free</p>
         </div>

         <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
            <p className="font-semibold">Total</p>
            <p>BDT {Math.round(totalPrice)}</p>
         </div>

         <div className="flex items-center mb-4 mt-2">
            <input
               type="checkbox"
               name="aggrement"
               id="aggrement"
               className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
            />
            <label
               htmlFor="aggrement"
               className="text-gray-600 ml-3 cursor-pointer text-sm"
            >
               I agree that all the information provided is authentic.
            </label>
         </div>
         <SubmitButton pendingMsg="Connecting..." title="Place Order" />
         {error && <div className="mt-4"></div>}
         <FormError message={error} />
      </div>
   )
}

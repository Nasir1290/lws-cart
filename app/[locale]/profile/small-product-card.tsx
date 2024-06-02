import { Cartlist_Product, Wishlist_Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
   product: Cartlist_Product | Wishlist_Product
}

export default function SmallProductCard({ product }: Props) {
   return (
      <div className="grid grid-cols-[auto,1fr] gap-6 p-4 border-gray-200 rounded">
         <div className="w-24 h-14 relative">
            <Image
               fill
               src={product.images[0]}
               alt="Product Thumbnail"
               className="object-cover"
            />
         </div>
         <div>
            <Link
               href={`/product-details/${product._id}`}
               className="text-gray-800 text-lg font-medium uppercase"
            >
               {product.name}
            </Link>
            <p className="text-gray-500 text-sm">
               Availability:{' '}
               <span
                  className={
                     product.stockQuantity > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                  }
               >
                  {product.stockQuantity > 0
                     ? `In Stock(${product.stockQuantity})`
                     : 'Out of Stock'}
               </span>
            </p>
         </div>
      </div>
   )
}

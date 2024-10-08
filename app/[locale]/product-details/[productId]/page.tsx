import AddToCartButton from '@/components/ui/add-to-cart-button'
import Breadcrumb from '@/components/ui/breadcrumb'
import WishlistButton from '@/components/ui/wishlist-button'
import { getCartlist } from '@/server-actions/get-cartlist'
import { getRelatedProducts } from '@/server-actions/get-related-products'
import { getSingleProduct } from '@/server-actions/get-single-product'
import { getWishlist } from '@/server-actions/get-wishlist'
import { getComments } from '@/server-actions/getComments'
import { toggleCartlist } from '@/server-actions/toggle-cartlist'
import { toggleWishlist } from '@/server-actions/toggle-wishlist'
import { Locale } from '@/types/i18n'
import { convertNumEnToBn } from '@/utils/convertNumEnToBn'
import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import { SiTicktick } from 'react-icons/si'

import CommentList from '../components/comment-list'
import ImageGallery from '../components/image-gallery'
import ProductDescription from '../components/product-description'
import QuantityButton from '../components/quantity-button'
import RatingAndComment from '../components/rating-comment'
import RelatedProducts from '../components/related-products'
import ShareOption from '../components/share-option'
import StarRating from '../components/star-rating'

type MetadataProps = {
   params: { productId: string }
}

export async function generateMetadata(
   { params }: MetadataProps,
   parent: ResolvingMetadata,
): Promise<Metadata> {
   // fetch data
   const parentMatadata = await parent

   try {
      const product = await getSingleProduct(params.productId)
      if (product) {
         const descriptionTags = product.description.split(' ')
         const nameTags = product.name.split(' ')
         const ogImages = product.images.map((image) => ({
            url: image,
            width: 800,
            height: 600,
         }))

         return {
            title: product.name,
            description: product.description,
            generator: 'LWSKart - Your One-Stop Online Shop',
            applicationName: 'LWSKart',
            referrer: 'origin-when-cross-origin',
            keywords: [
               ...product.tags,
               product.brand,
               product.category,
               product.model,
               ...nameTags,
               ...descriptionTags,
               ...product.features,
            ],
            authors: [{ name: product.brand }],
            creator: product.brand,
            publisher: product.brand,
            openGraph: {
               title: product.name,
               description: product.description,
               url: `https://shadhin-shop.vercel.app/en/product-details/${product._id}`,
               siteName: 'LWSKart - Your One-Stop Online Shop',
               images: ogImages,
               locale: 'en_US',
               type: 'website',
            },
            icons: {
               icon: '/assets/images/favicon/favicon-32x32.png',
               shortcut: '/assets/images/favicon/favicon-16x16.png',
               apple: '/assets/images/favicon/apple-touch-icon.png',
            },
         }
      } else
         return {
            title: parentMatadata.title,
            description: parentMatadata.description,
            keywords: parentMatadata.keywords,
         }
   } catch (error) {
      return {
         title: parentMatadata.title,
         description: parentMatadata.description,
         keywords: parentMatadata.keywords,
      }
   }
}

interface Props {
   params: {
      productId: string
      locale: Locale
   }
   searchParams: {
      action: string
      actionid: string
   }
}

export default async function ProductDetails({
   params,
   searchParams: { action, actionid },
}: Props) {
   const bangla = await import('../components/bn.json')
   const english = await import('../components/en.json')
   const dict = params.locale === 'bn' ? bangla : english

   const product = await getSingleProduct(params.productId)
   const comments = await getComments({ productId: params.productId })

   const relatedProducts = await getRelatedProducts(
      product?.tags!,
      params.productId,
   )

   const wishlistProducts = await getWishlist()
   const isWishlisted = wishlistProducts.some(
      (product) => product._id === params.productId,
   )

   const cartlistProducts = await getCartlist()
   const isInCart = cartlistProducts.some(
      (product) => product.product._id === params.productId,
   )

   const discountPrice =
      product && (product?.price * (100 - product?.discount)) / 100

   if (actionid) {
      if (action === 'add-to-cart') {
         await toggleCartlist({
            isInCart: false,
            locale: params.locale,
            productId: actionid,
            path: `/${params.locale}/product-details/${params.productId}`,
            quantity: 1,
         })
         redirect(`/${params.locale}/product-details/${params.productId}`)
      }
      if (action === 'add-to-wishlist') {
         await toggleWishlist({
            isWishlisted: false,
            locale: params.locale,
            productId: actionid,
            path: `/${params.locale}/product-details/${params.productId}`,
         })
         redirect(`/${params.locale}/product-details/${params.productId}`)
      }
   }

   return (
      <>
         <Breadcrumb current="Product" />
         <div className="container grid grid-cols-2 gap-6">
            <div className="overflow-hidden">
               <ImageGallery images={product?.images || []} />
            </div>

            <div>
               <h2 className="text-3xl font-medium uppercase mb-2">
                  {product?.name}
               </h2>
               <div className="flex items-center mb-4">
                  <StarRating comments={comments} />
                  <div className="text-xs text-gray-500 ml-3">
                     (
                     {comments.length > 1
                        ? `${comments.length} Reviews`
                        : `${comments.length} Review`}
                     )
                  </div>
               </div>
               <div className="space-y-2">
                  <p className="text-gray-800 font-semibold space-x-2">
                     <span>{dict.availability}: </span>
                     {product?.stockQuantity! > 0 ? (
                        <span className="text-green-600">{dict.inStock}</span>
                     ) : (
                        <span className="text-red-600">{dict.outOfStock}</span>
                     )}
                  </p>
                  <p className="space-x-2">
                     <span className="text-gray-800 font-semibold">
                        {dict.brand}:{' '}
                     </span>
                     <span className="text-gray-600">{product?.brand}</span>
                  </p>
                  <p className="space-x-2">
                     <span className="text-gray-800 font-semibold">
                        {dict.category}:{' '}
                     </span>
                     <span className="text-gray-600">{product?.category}</span>
                  </p>
                  <p className="space-x-2">
                     <span className="text-gray-800 font-semibold">SKU: </span>
                     <span className="text-gray-600">BE45VGRT</span>
                  </p>
               </div>
               <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                  <p className="text-xl text-primary font-semibold">
                     {dict.currency}{' '}
                     {params.locale === 'bn'
                        ? convertNumEnToBn(discountPrice!)
                        : discountPrice}
                  </p>
                  <p className="text-base text-gray-400 line-through">
                     {dict.currency}{' '}
                     {params.locale === 'bn'
                        ? convertNumEnToBn(product?.price!)
                        : product?.price}
                  </p>
                  <p className="text-base text-gray-400">
                     (
                     {params.locale === 'bn'
                        ? convertNumEnToBn(product?.discount!)
                        : product?.discount}
                     % {dict.off})
                  </p>
               </div>
               <div className="mt-4 text-gray-600">
                  <h3 className="text-gray-800 font-semibold">
                     {dict.features}
                  </h3>
                  <ul>
                     {product?.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-x-2">
                           <SiTicktick className="text-green-400" />
                           {feature}
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="mt-4">
                  <p className="space-x-2">
                     <span className="text-gray-800 font-semibold">
                        {dict.stockQuantity}:{' '}
                     </span>
                     <span className="text-gray-600">
                        {product?.stockQuantity}
                     </span>
                  </p>
               </div>

               <QuantityButton
                  dict={dict.default}
                  isInCart={isInCart}
                  stockQuantity={product?.stockQuantity}
               />

               <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                  <AddToCartButton
                     dict={dict.default}
                     locale={params.locale}
                     productId={params.productId}
                     isInCart={isInCart}
                  />
                  <WishlistButton
                     locale={params.locale}
                     dict={dict.default}
                     isWishlisted={isWishlisted}
                     productId={params.productId}
                  />
               </div>
               <ShareOption />
            </div>
         </div>

         <ProductDescription dict={dict.default} desc={product?.description!} />

         <RatingAndComment
            dict={dict.default}
            comments={comments}
            productId={params.productId}
         />
         <CommentList productId={params.productId} />

         <RelatedProducts
            dict={dict.default}
            locale={params.locale}
            products={relatedProducts}
         />
      </>
   )
}

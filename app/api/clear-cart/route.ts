import { mongoConnect } from '@/db/mongo-connect'
import { Cart } from '@/models/cart'
import { Product } from '@/models/product'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
   try {
      await mongoConnect()

      const timeAgo = new Date(
         Date.now() -
            parseInt(process.env.CART_PRODUCT_EXPIRED_TIME!) * 60 * 1000,
      )

      const expireds = await Cart.find({
         updatedAt: { $lt: timeAgo },
      }).lean()

      for (const expired of expireds) {
         await Product.findByIdAndUpdate(expired.productId, {
            $inc: { stockQuantity: expired.quantity },
         })
      }

      const result = await Cart.deleteMany({ updatedAt: { $lt: timeAgo } })

      return NextResponse.json({
         success: true,
         deletedCount: result.deletedCount,
      })
   } catch (error: any) {
      return NextResponse.json(
         { success: false, error: error?.message || 'Server Error' },
         { status: 500 },
      )
   }
}

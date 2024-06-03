'use server'

import { auth } from '@/auth'
import { generatePDFHtml } from '@/components/email/generate-pdf-html'
import { getHtmlEmailTemplate } from '@/components/email/get-html-email-template'
import { mongoConnect } from '@/db/mongo-connect'
import { Cart } from '@/models/cart'
import { User } from '@/models/user'
import { Res_User, T_User } from '@/types/user'
import { generateRandomInvoice } from '@/utils/generateRandomInvoice'
import { addressSchema } from '@/zod/zod-schema'
import { redirect } from 'next/navigation'

import { getCartlist } from './get-cartlist'

const nodemailer = require('nodemailer')

export const checkoutAction = async (prev: any, formData: FormData) => {
   const session = await auth()
   if (!session?.user) return { message: 'Your session expired!' }

   const locale = formData.get('locale')

   const address = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      region: formData.get('region'),
      address: formData.get('address'),
      city: formData.get('city'),
      phone: formData.get('phone'),
      email: formData.get('email'),
   }

   const validatedFields = addressSchema.safeParse(address)
   if (!validatedFields.success) {
      return {
         errors: validatedFields.error.flatten().fieldErrors,
      }
   }

   if (!formData.get('aggrement'))
      return { message: 'Please check on our aggrement*' }

   let newOder

   try {
      await mongoConnect()
      const products = await getCartlist()
      const invoiceId = generateRandomInvoice(6)
      const order = {
         products: products.map((product) => ({
            ...product.product,
            productId: product.product._id,
            _id: product._id,
         })),
         shippingAddress: address,
         invoice: invoiceId,
         createdAt: new Date().toISOString(),
      }

      const totalAmount = products.reduce((prev, curr) => {
         const discountPrice =
            (curr.product.price * (100 - curr.product.discount)) / 100
         return prev + discountPrice * curr.product.quantity
      }, 0)

      const newUser: Res_User | null = await User.findOneAndUpdate(
         { email: session?.user.email },
         {
            $set: { 'address.shippingAddress': address },
            $addToSet: { order },
         },
         { upsert: true, new: true },
      ).lean()
      await Cart.deleteMany({ userId: newUser?._id.toString() })
      newOder = newUser?.order && newUser.order[newUser.order?.length - 1]

      const htmlString = generatePDFHtml({
         products: order.products,
         shippingAddress: {
            address: order.shippingAddress.address?.toString()!,
            firstName: order.shippingAddress.firstName?.toString()!,
            lastName: order.shippingAddress.lastName?.toString()!,
            city: order.shippingAddress.city?.toString()!,
            region: order.shippingAddress.region?.toString()!,
            phone: order.shippingAddress.phone?.toString()!,
            email: order.shippingAddress.email?.toString()!,
         },
         invoice: order.invoice,
         createdAt: order.createdAt,
      })

      // generate pdf using puppeter
      // const browser = await puppeteer.launch({
      //    args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // })

      // const page = await browser.newPage()
      // await page.setContent(htmlString)
      // const pdfBuffer = await page.pdf({
      //    width: '320mm',
      //    height: '397mm',
      //    printBackground: true,
      //    margin: { top: '20mm', right: '0mm', bottom: '0mm', left: '0mm' },
      // })
      // await browser.close()

      const transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 587,
         secure: false,
         auth: {
            user: process.env.SMTP_ID,
            pass: process.env.SMTP_SECRET,
         },
      })
      const info = await transporter.sendMail({
         from: `"LWSKart 👻" <${process.env.SMTP_ID}>`,
         to: session.user.email,
         subject: `LWSKart Order Confirmation: Your Order #${invoiceId} Has Been Placed`,
         html: getHtmlEmailTemplate({
            fullname: session?.user?.name || 'Sir/Madam',
            invoiceId,
            orderDate: newOder?.createdAt!,
            totalAmount,
         }),
         // attachments: [
         //    {
         //       filename: `invoice-${invoiceId}.pdf`,
         //       content: pdfBuffer,
         //    },
         // ],
      })

      console.log('Message sent: %s', info.messageId)
   } catch (error: any) {
      console.log(error)
      return { message: error.message || 'Internal server problem' }
   }
   redirect(
      newOder
         ? `/${locale}/invoice/${newOder?._id.toString()}`
         : `/${locale}/order-list`,
   )
}

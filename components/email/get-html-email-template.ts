import { getDateFormat } from '@/utils/getDateFormat'

interface Props {
   fullname: string
   invoiceId: string
   orderDate: string
   totalAmount: number
}

export const getHtmlEmailTemplate = ({
   fullname,
   invoiceId,
   orderDate,
   totalAmount,
}: Props) => {
   return `<!doctype html>
   <html lang="en">
      <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <title>Document</title>
      </head>
      <body
         style="
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #4a4a4a;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
         "
      >
         <div
            style="
               margin: 40px auto;
               background-color: #ffffff;
               padding: 30px;
               border: 1px solid #e0e0e0;
               border-radius: 8px;
               box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            "
         >
            <h2
               style="
                  color: #333333;
                  text-align: center;
                  border-bottom: 2px solid #eeeeee;
                  padding-bottom: 10px;
               "
            >
               Dear ${fullname},
            </h2>
            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0">
               We hope this email finds you well.
            </p>
            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0">
               Thank you for your recent order with
               <strong style="color: #fd3d57">LWSKart</strong>. We are pleased to
               confirm that your order
               <strong style="color: #fd3d57">#${invoiceId}</strong> has been
               successfully placed and processed. Please find the details of your
               order and the corresponding invoice attached below.
            </p>
            <div
               style="
                  margin: 30px 0;
                  padding: 20px;
                  background-color: #fafafa;
                  border: 1px solid #e0e0e0;
                  border-radius: 4px;
               "
            >
               <h3 style="color: #333333; margin-bottom: 10px">Order Details</h3>
               <!-- Include detailed order information here -->
               <p style="font-size: 14px; line-height: 1.6">
                  Order Number: <strong>#${invoiceId}</strong>
               </p>
               <p style="font-size: 14px; line-height: 1.6">
                  Order Date: <strong>${getDateFormat(orderDate)}</strong>
               </p>
               <p style="font-size: 14px; line-height: 1.6">
                  Total Amount: <strong>${Math.round(totalAmount)}</strong>
               </p>
            </div>
            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0">
               If you have any questions or need further assistance, please do not
               hesitate to contact our customer support team.
            </p>
            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0">
               Best regards,
            </p>
            <p style="font-size: 16px; line-height: 1.6; margin: 0">
               The <strong style="color: #fd3d57">LWSKart</strong> Team
            </p>
         </div>
      </body>
   </html>
   `
}

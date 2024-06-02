'use client'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRef } from 'react'
import toast from 'react-hot-toast'

import DownloadInvoice from './download-invoice'

interface Props {
   invoiceId: string
   children: React.ReactNode
   dict: {
      print: string
      download: string
   }
}

export default function InvoiceCard({ invoiceId, children, dict }: Props) {
   const invoiceRef = useRef<HTMLDivElement>(null)

   const generatePDF = async () => {
      try {
         const canvas = await html2canvas(invoiceRef.current!)
         const imgData = canvas.toDataURL('image/png')
         const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [595, 642],
         })
         const imgWidth = 595
         const imgHeight = (canvas.height * imgWidth) / canvas.width

         pdf.addImage(imgData, 'PNG', 0, 30, imgWidth, imgHeight)
         pdf.save(`invoice-${invoiceId}.pdf`)
      } catch (error) {
         toast.error('Error generating PDF')
      }
   }

   return (
      <>
         <DownloadInvoice dict={dict} generatePDF={generatePDF} />
         <div ref={invoiceRef}>{children}</div>
      </>
   )
}

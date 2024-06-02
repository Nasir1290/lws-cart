'use client'

interface Props {
   generatePDF: () => Promise<void>
}

export default function DownloadInvoice({ generatePDF }: Props) {
   return (
      <div className="flex justify-end space-x-4 mt-6 container">
         <button
            className="bg-primary hover:bg-primary/80 text-white font-medium py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out mb-8"
            onClick={generatePDF}
         >
            Download Invoice
         </button>
      </div>
   )
}

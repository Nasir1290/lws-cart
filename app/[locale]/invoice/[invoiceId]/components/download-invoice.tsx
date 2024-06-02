'use client'

interface Props {
   generatePDF: () => Promise<void>
   dict: {
      print: string
      download: string
   }
}

export default function DownloadInvoice({ generatePDF, dict }: Props) {
   return (
      <div className="flex justify-end space-x-4 px-10 md:px-16 mt-6 container print:hidden">
         <button
            className="bg-gray-800  hover:bg-gray-800/80 text-white font-medium py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out mb-8"
            onClick={() => print()}
         >
            {dict.print}
         </button>
         <button
            className="bg-primary hover:bg-primary/80 text-white font-medium py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out mb-8"
            onClick={generatePDF}
         >
            {dict.download}
         </button>
      </div>
   )
}

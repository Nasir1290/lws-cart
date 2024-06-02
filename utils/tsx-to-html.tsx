import { PDF_Order } from '@/types/order'
import { ComponentType } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const tsxToHtml = (
   Component: ComponentType<PDF_Order>,
   order: PDF_Order,
) => {
   return renderToStaticMarkup(<Component {...order} />)
}

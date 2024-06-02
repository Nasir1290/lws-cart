import { redirectAction } from '@/server-actions/redirect-action'
import { usePathname } from 'next/navigation'

import ResetSubmit from './reset-submit'

export default function ResetForm() {
   const pathname = usePathname()
   const updateAction = redirectAction.bind(null, pathname)

   return (
      <form action={updateAction}>
         <ResetSubmit />
      </form>
   )
}

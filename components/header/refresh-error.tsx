import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function RefreshError() {
   const { data: session } = useSession()
   useEffect(() => {
      if (session?.error === 'RefreshAccessTokenError') {
         signOut()
      }
   }, [session])
   return null
}

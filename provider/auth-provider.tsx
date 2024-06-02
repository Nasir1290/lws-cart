'use client'

import { SessionProvider } from 'next-auth/react'

interface Children {
   children: React.ReactNode
}

export default function AuthProvider({ children }: Children) {
   return <SessionProvider>{children}</SessionProvider>
}

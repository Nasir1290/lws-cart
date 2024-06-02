'use client'

import { SessionProvider } from 'next-auth/react'

import RefreshError from './refresh-error'

export default function RefreshTokenHandler() {
   return (
      <SessionProvider>
         <RefreshError />
      </SessionProvider>
   )
}

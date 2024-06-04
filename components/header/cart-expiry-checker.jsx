'use client'

import { useEffect } from 'react'

export default function CartExpiryChecker() {
   useEffect(() => {
      const startFetching = async () => {
         await fetch('/api/clear-cart', { method: 'DELETE' })
      }

      const intervalId = setInterval(() => {
         startFetching().catch(() => {})
      }, 60000)

      return () => clearInterval(intervalId)
   }, [])
   return <div></div>
}

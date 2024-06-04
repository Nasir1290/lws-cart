'use client'

import { Locale } from '@/types/i18n'
import { Lang_Cart } from '@/types/lang/cart'
import { useEffect, useRef, useState } from 'react'

export default function ExpireTime({
   updatedAt,
   dict,
   locale,
}: {
   updatedAt: string
   dict: Lang_Cart
   locale: Locale
}) {
   const [expiredIn, setExpiredIn] = useState<string>()
   const intervalId = useRef<NodeJS.Timeout | null>(null)

   useEffect(() => {
      const tick = () => {
         const current = Date.now()
         const cartUpdateTime = new Date(updatedAt)
         const willExpiredIn =
            cartUpdateTime.getTime() +
            parseInt(process.env.NEXT_PUBLIC_CART_EXPIRED_TIME!) * 60 * 1000
         if (willExpiredIn > current) {
            const date = new Date(willExpiredIn - current)
            const clockFormate = date.toLocaleTimeString(
               locale === 'bn' ? 'bn-BD' : 'en-US',
               {
                  minute: '2-digit',
                  second: '2-digit',
               },
            )
            setExpiredIn(clockFormate)
         } else {
            setExpiredIn('Expired')
            if (intervalId.current) {
               clearInterval(intervalId.current as NodeJS.Timeout)
            }
         }
      }
      intervalId.current = setInterval(tick, 1000)
      return () => {
         clearInterval(intervalId.current as NodeJS.Timeout)
      }
   }, [updatedAt, locale])

   return (
      expiredIn && (
         <p className="text-gray-500 text-sm">
            {dict.expiredIn} :{' '}
            <span className={'font-medium text-primary'}>{expiredIn}</span>
         </p>
      )
   )
}

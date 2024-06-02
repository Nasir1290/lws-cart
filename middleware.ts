import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'bn']
const defaultLocale = 'en'

function getLocale(request: NextRequest) {
   const preference = request.headers.get('accept-language')
   const headers = { 'accept-language': preference || defaultLocale }
   const languages = new Negotiator({ headers }).languages()
   return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl
   const pathnameHasLocale = locales.some(
      (locale) =>
         pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
   )
   if (pathnameHasLocale) return

   const locale = getLocale(request)
   request.nextUrl.pathname = `/${locale}${pathname}`
   return NextResponse.redirect(request.nextUrl)
}

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
}

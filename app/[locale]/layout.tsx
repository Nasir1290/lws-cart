import Footer from '@/components/footer'
import Copyright from '@/components/footer/copyright'
import Header from '@/components/header/header'
import Navbar from '@/components/header/navbar'
import { Locale } from '@/types/i18n'
import { Toaster } from 'react-hot-toast'

interface Children {
   children: React.ReactNode
   params: {
      locale: Locale
   }
}

export default function Layout({ children, params: { locale } }: Children) {
   return (
      <>
         <Header locale={locale} />
         <Navbar locale={locale} />
         {children}
         <Footer locale={locale} />
         <Copyright locale={locale} />
         <div id="modal-root" />
         <Toaster
            position="top-center"
            toastOptions={{
               style: {
                  borderRadius: '5px',
                  background: '#333',
                  color: '#fff',
               },
            }}
         />
      </>
   )
}

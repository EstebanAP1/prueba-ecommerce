import type { Metadata } from 'next'
import { Montserrat_Alternates } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import clsx from 'clsx'
import dynamic from 'next/dynamic'

const monserrat_a = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export const metadata: Metadata = {
  title: {
    default: 'Ecommerce App',
    template: 'Ecommerce App | %s'
  },
  description: 'Prueba técnina Junior Frontend Developer'
}

const StoreProvider = dynamic(() => import('@/app//StoreProvider'), {
  ssr: false
})

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body
        className={clsx(
          'max-w-dvw flex min-h-dvh text-primary-black',
          monserrat_a.className
        )}>
        <StoreProvider>
          {children}
          <Toaster
            pauseWhenPageIsHidden
            richColors
            position='bottom-left'
            className='select-none'
          />
        </StoreProvider>
      </body>
    </html>
  )
}

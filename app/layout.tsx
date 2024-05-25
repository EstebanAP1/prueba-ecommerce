import type { Metadata } from 'next'
import { Montserrat_Alternates } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import clsx from 'clsx'

const monserrat_a = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export const metadata: Metadata = {
  title: 'Ecommerce App',
  description: 'Prubea técnina Junior Frontend Developer'
}

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
        {children}
        <Toaster pauseWhenPageIsHidden richColors closeButton />
      </body>
    </html>
  )
}

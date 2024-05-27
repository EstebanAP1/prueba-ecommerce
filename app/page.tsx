'use client'

import Header from '@/app/ui/header'
import AddToCartModal from '@/app/ui/add-to-cart'
import Cart from '@/app/ui/cart'
import Products from '@/app/ui/products'

export default function StorePage() {
  return (
    <>
      <AddToCartModal />
      <Cart />
      <div className='flex h-dvh w-full flex-col items-center justify-center'>
        <Header />
        <main className='flex w-full grow flex-col items-center justify-start overflow-y-auto scroll-smooth'>
          <Products />
        </main>
      </div>
    </>
  )
}

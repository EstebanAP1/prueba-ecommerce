/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/app/lib/definitions'
import { getProducts } from '@/app/lib/data'
import Header from '@/app/ui/header'

export default function StorePage() {
  const [products, setProducts] = useState([] as Product[])

  useEffect(() => {
    getProducts().then(response => setProducts(response))
  }, [])

  return (
    <div className='flex min-h-dvh w-full flex-col items-center justify-center'>
      <Header />
      <main className='flex w-full grow flex-wrap items-center justify-center pb-10'>
        <div id='home' className='h-dvh w-full'></div>
        <div
          id='products'
          className='flex flex-wrap items-center justify-center gap-5 lg:max-w-[80%]'>
          {products.map(product => {
            const price =
              product.price - (product.price * product.discount) / 100
            const priceFormatted = price.toLocaleString('es-CO')
            const showedPrice =
              product.discount > 0 ? (
                <>
                  <p className='font-normal text-red-400 line-through'>
                    ${product.price.toLocaleString('es-CO')}
                  </p>
                  <p>${priceFormatted}</p>
                </>
              ) : (
                <p>${priceFormatted}</p>
              )

            return (
              <div
                key={product.id}
                className='flex flex-col items-center justify-center gap-2'>
                <div className='relative'>
                  {product.discount > 0 && (
                    <span className='absolute right-1 top-1 flex size-14 items-center justify-center rounded-full bg-primary-black text-xs text-primary-white'>
                      {product.discount}% OFF
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className='size-52 rounded-md object-cover'
                  />
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <h3 className='text-lg font-semibold'>{product.name}</h3>
                  <p className='text-sm'>{product.description}</p>
                  <div className='flex gap-2 text-sm font-semibold'>
                    {showedPrice}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

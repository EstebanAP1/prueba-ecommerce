/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect } from 'react'
import { getProducts } from '@/app/lib/data'
import Header from '@/app/ui/header'
import clsx from 'clsx'
import { useProducts } from '@/app/lib/features/hooks/useProducts'
import AddToCartModal from '@/app/ui/add-to-cart'
import Cart from '@/app/ui/cart'

export default function StorePage() {
  const {
    products,
    categories,
    loading,
    initializeProducts,
    filterByCategory,
    showModal
  } = useProducts()

  useEffect(() => {
    getProducts().then(response => {
      initializeProducts(response)
    })
  }, [initializeProducts])

  return (
    <>
      <AddToCartModal />
      <Cart />
      <div className='flex h-dvh w-full flex-col items-center justify-center'>
        <Header />
        <main className='flex w-full grow flex-col items-center justify-start overflow-y-auto scroll-smooth'>
          <div className='flex w-full max-w-[80%] grow flex-col items-center justify-start gap-5'>
            {loading && (
              <div className='flex h-full items-center justify-center text-3xl font-bold'>
                <p>Cargando...</p>
              </div>
            )}
            {!loading && (
              <div className='sticky top-2 z-20 flex w-full justify-around gap-24 overflow-x-auto rounded-md bg-primary-white/80 px-24 py-5 [scrollbar-width:none]'>
                {categories.list.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => filterByCategory(category)}
                    aria-label={`Filter products by ${category}`}
                    disabled={categories.selected === category}
                    aria-disabled={categories.selected === category}
                    className={clsx(
                      'select-none rounded-md p-2 transition-all',
                      categories.selected === category
                        ? 'bg-interactive'
                        : 'hover:bg-primary-black/10'
                    )}>
                    {category}
                  </button>
                ))}
              </div>
            )}
            {products.length === 0 && !loading && (
              <div className='flex h-full items-center justify-center text-3xl font-bold'>
                <p>No hay productos disponibles</p>
              </div>
            )}
            {products.length > 0 && !loading && (
              <div
                id='products'
                className='flex flex-wrap items-start justify-center gap-5 p-5'>
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
                      className={clsx(
                        'group flex cursor-pointer flex-col items-center justify-center gap-2',
                        product.stock === 0 && 'pointer-events-none'
                      )}
                      onClick={() => showModal(product)}>
                      <div className='relative'>
                        {product.discount > 0 && (
                          <span className='absolute right-1 top-1 z-10 flex size-14 select-none items-center justify-center rounded-full bg-primary-black text-xs text-primary-white transition-all group-hover:scale-110'>
                            {product.discount}% OFF
                          </span>
                        )}
                        {product.stock === 0 && (
                          <>
                            <div className='absolute z-10 flex size-full select-none items-center justify-center rounded-md bg-primary-black/60 text-3xl font-semibold text-red-500'>
                              <span className='rotate-45'>AGOTADO</span>
                            </div>
                          </>
                        )}
                        <img
                          src={product.image}
                          alt={product.name}
                          className={clsx(
                            'size-52 select-none rounded-md object-cover transition-all',
                            product.stock === 0
                              ? 'grayscale filter'
                              : 'group-hover:scale-105'
                          )}
                        />
                      </div>
                      <div className='flex flex-col items-center justify-center'>
                        <h3 className='text-lg font-semibold'>
                          {product.name}
                        </h3>
                        <p className='text-sm'>{product.description}</p>
                        <div className='flex gap-2 text-sm font-semibold'>
                          {showedPrice}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

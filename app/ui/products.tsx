/* eslint-disable @next/next/no-img-element */

import { useEffect } from 'react'
import clsx from 'clsx'
import { toast } from 'sonner'
import { getCategories, getProducts } from '@/app/lib/data'
import { useProducts } from '@/app/lib/features/hooks/useEcommerce'
import FilterProducts from '@/app/ui/filter-products'

export default function Products() {
  const {
    products,
    loading,
    initializeProducts,
    initializeCategories,
    setLoading,
    showModal,
    categories: { selected }
  } = useProducts()

  useEffect(() => {
    setLoading(true)
    getProducts().then(response => {
      if (!response.success) {
        toast.error(response.message)
        setLoading(false)
        return
      }
      initializeProducts(response.data)
    })
  }, [initializeProducts, setLoading])

  useEffect(() => {
    setLoading(true)
    getCategories().then(response => {
      if (!response.success) {
        toast.error(response.message)
        setLoading(false)
        return
      }
      initializeCategories(response.data)
    })
  }, [initializeCategories, setLoading])

  return (
    <div className='flex w-full max-w-[80%] grow flex-col items-center justify-start gap-5'>
      {loading && (
        <div className='flex h-full items-center justify-center text-3xl font-bold'>
          <p>Cargando...</p>
        </div>
      )}
      <FilterProducts />
      {products.length === 0 && !loading && (
        <div className='flex h-full items-center justify-center text-3xl font-bold'>
          <p>No hay productos disponibles</p>
        </div>
      )}
      {products.length > 0 && !loading && (
        <div
          id='products'
          className='grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-start justify-center gap-5'>
          {products.map(product => {
            const price =
              product.price - (product.price * product.discount) / 100 ||
              product.price
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
              <button
                key={product.id}
                className={clsx(
                  'group flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md p-2 transition-all hover:scale-110',
                  product.stock === 0 && 'pointer-events-none',
                  selected !== 0 && product.categoryId !== selected && 'hidden'
                )}
                onClick={() => showModal(product)}
                aria-label='Open add to cart'
                name='product-card'
                aria-disabled={
                  selected !== 0 && product.categoryId !== selected
                }
                disabled={selected !== 0 && product.categoryId !== selected}>
                <div className='relative'>
                  {product.discount > 0 && (
                    <span className='absolute right-1 top-1 z-10 flex size-14 select-none items-center justify-center text-nowrap rounded-full bg-primary-black text-[10px] text-primary-white transition-all group-hover:scale-110'>
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
                    src={'https://via.placeholder.com/150'}
                    alt={product.name}
                    className={clsx(
                      'size-52 select-none rounded-md object-cover transition-all',
                      product.stock === 0 && 'grayscale filter'
                    )}
                  />
                </div>
                <div className='flex h-full flex-col items-center justify-between gap-1'>
                  <div className='flex flex-col text-center'>
                    <h3 className='text-base font-semibold'>{product.name}</h3>
                    <p className='text-sm'>{product.description}</p>
                  </div>
                  <div className='flex gap-2 text-sm font-semibold'>
                    {showedPrice}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { toast } from 'sonner'
import { useProducts } from '@/app/lib/features/hooks/useEcommerce'
import { Button } from '@/app/ui/button'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function AddToCartModal() {
  const router = useRouter()
  const { modal, hideModal, incrementProduct, decrementProduct, addToCart } =
    useProducts()

  const { show, product } = modal

  const price =
    product?.price - (product?.price * product?.discount) / 100 ||
    product?.price
  const priceFormatted = price.toLocaleString('es-CO')
  const showedPrice =
    product?.discount > 0 ? (
      <>
        <p className='font-normal text-red-400 line-through'>
          ${product?.price.toLocaleString('es-CO')}
        </p>
        <p>${priceFormatted}</p>
      </>
    ) : (
      <p>${priceFormatted}</p>
    )

  useEffect(() => {
    const escapeHideModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideModal()
      }
    }
    document.addEventListener('keydown', escapeHideModal)

    return () => {
      document.removeEventListener('keydown', escapeHideModal)
    }
  }, [hideModal])

  return (
    <div
      className={clsx(
        'absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center',
        !show && 'pointer-events-none'
      )}>
      {show && (
        <div
          className='fixed left-0 top-0 h-dvh w-dvw overflow-hidden after:absolute after:top-0 after:z-30 after:h-full after:w-full after:bg-primary-black/30'
          onClick={hideModal}></div>
      )}
      <section
        className={clsx(
          'bottom-0 z-40 flex h-[80%] w-[60%] flex-col rounded bg-primary-white text-primary-black transition-all duration-200',
          show ? 'translate-x-0' : '-translate-x-[200%]'
        )}>
        <header className='fixed top-0 flex w-full items-center justify-between px-5 py-2'>
          <h3 className='text-lg font-semibold'>Agregar al carrito</h3>
          <button onClick={hideModal}>
            <XMarkIcon className='size-5' />
          </button>
        </header>
        <main className='grid grow grid-cols-2 items-center gap-5 p-10'>
          <div className='flex items-center justify-center'>
            <img
              src={'https://via.placeholder.com/150'}
              alt={product?.name}
              className='aspect-square w-full select-none rounded object-cover'
            />
          </div>
          <div className='flex h-full flex-col items-start justify-around p-10'>
            <div className='flex flex-col gap-2'>
              <h4 className='text-2xl font-semibold'>{product?.name}</h4>
              <p className='text-wrap text-sm'>{product?.description}</p>
            </div>
            <div className='flex gap-2 text-lg font-semibold'>
              {showedPrice}
            </div>
            <div className='grid w-[50%] max-w-[50%] grid-cols-3 items-center'>
              <button
                onClick={decrementProduct}
                className='flex items-center justify-center rounded p-2 transition-all hover:bg-primary-black/5 disabled:opacity-50 disabled:hover:bg-transparent'
                disabled={product.quantity === 1}
                aria-label='Decrement product quantity'
                aria-disabled={product.quantity === 1}>
                <MinusIcon className='size-6' />
              </button>
              <p className='select-none p-2 text-center text-lg'>
                {product.quantity}
              </p>
              <button
                onClick={incrementProduct}
                className='flex items-center justify-center rounded p-2 transition-all hover:bg-primary-black/5 disabled:opacity-50 disabled:hover:bg-transparent'
                disabled={product.quantity === product.stock}
                aria-label='Increment product quantity'
                aria-disabled={product.quantity === product.stock}>
                <PlusIcon className='size-6' />
              </button>
            </div>
            <Button
              onClick={addToCart}
              className='flex gap-2 border border-primary-black'
              aria-label='Add item to cart'
              id='add-to-cart'>
              <p>Agregar al carrito</p>
              <span className='font-medium'>
                ${(price * product.quantity).toLocaleString('es-CO')}
              </span>
            </Button>
          </div>
        </main>
      </section>
    </div>
  )
}

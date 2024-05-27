/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import { useProducts } from '@/app/lib/features/hooks/useEcommerce'
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/app/ui/button'

export default function Cart() {
  const {
    cart,
    closeCart,
    incrementProductInCart,
    decrementProductInCart,
    removeProductFromCart
  } = useProducts()

  const { products, show } = cart

  const price = products
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toLocaleString('es-CO')

  return (
    <div
      className={clsx(
        'absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center',
        !show && 'pointer-events-none'
      )}>
      {show && (
        <div
          className='fixed left-0 top-0 h-dvh w-dvw overflow-hidden after:absolute after:top-0 after:z-30 after:h-full after:w-full after:bg-primary-black/30'
          onClick={closeCart}></div>
      )}
      <section
        className={clsx(
          'bottom-0 z-40 flex h-[90%] w-[70%] flex-col rounded bg-primary-white text-primary-black transition-all duration-200',
          show ? 'translate-y-0' : '-translate-y-[200%]'
        )}>
        <header className='fixed top-0 flex w-full items-center justify-between px-5 py-2'>
          <h3 className='text-lg font-semibold'>Carrito de compras</h3>
          <button onClick={closeCart}>
            <XMarkIcon className='size-5' />
          </button>
        </header>
        <main className='flex grow flex-col items-center justify-start gap-5 px-10 py-16'>
          {products.map(product => (
            <div
              key={product.id}
              className='flex w-full items-center justify-between gap-5'>
              <div className='flex items-center gap-5'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='h-16 w-16 rounded-md object-cover'
                />
                <div className='flex flex-col'>
                  <p>{product.name}</p>
                  <p>${product.price.toLocaleString('es-CO')}</p>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center gap-3'>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={() => decrementProductInCart(product.id)}
                    className='flex items-center justify-center rounded p-1 transition-all hover:bg-primary-black/5 disabled:opacity-50 disabled:hover:bg-transparent'
                    disabled={product.quantity === 1}
                    aria-label='Decrement product quantity'
                    aria-disabled={product.quantity === 1}>
                    <MinusIcon className='size-6' />
                  </button>
                  <p className='select-none text-center'>{product.quantity}</p>
                  <button
                    onClick={() => incrementProductInCart(product.id)}
                    className='flex items-center justify-center rounded p-1 transition-all hover:bg-primary-black/5 disabled:opacity-50 disabled:hover:bg-transparent'
                    disabled={product.quantity === product.stock}
                    aria-label='Increment product quantity'
                    aria-disabled={product.quantity === product.stock}>
                    <PlusIcon className='size-6' />
                  </button>
                </div>
                <button
                  className='flex items-center justify-center rounded p-1 transition-all hover:bg-primary-black/5 disabled:opacity-50 disabled:hover:bg-transparent'
                  onClick={() => removeProductFromCart(product.id)}
                  aria-label='Remove item from cart'>
                  <TrashIcon className='size-5' />
                </button>
              </div>
            </div>
          ))}
        </main>
        <footer className='flex justify-between p-5'>
          <p className='text-lg font-medium'>Total: ${price}</p>
          <Button className='border border-primary-black'>
            Realizar pedido
          </Button>
        </footer>
      </section>
    </div>
  )
}

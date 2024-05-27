/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { toast } from 'sonner'
import { getCookie } from 'cookies-next'
import { simulatePayment } from '@/app/lib/actions'
import { useProducts } from '@/app/lib/features/hooks/useEcommerce'
import LoginForm from '@/app/ui/login-form'
import { Button } from '@/app/ui/button'
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function Cart() {
  const {
    cart,
    closeCart,
    incrementProductInCart,
    decrementProductInCart,
    removeProductFromCart,
    clearCart
  } = useProducts()
  const [showLogin, setShowLogin] = useState(false)

  const { products, show } = cart

  const price = products
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toLocaleString('es-CO')

  useEffect(() => {
    const escapeHideModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !showLogin) {
        closeCart()
      }
      if (e.key === 'Escape' && showLogin) {
        setShowLogin(false)
      }
    }
    document.addEventListener('keydown', escapeHideModal)

    return () => {
      document.removeEventListener('keydown', escapeHideModal)
    }
  }, [closeCart, showLogin])

  const handlePayment = async () => {
    if (cart.products.length === 0) {
      toast.error('No hay productos en el carrito.', {
        duration: 3000
      })
      return
    }
    if (cart.products.find(product => !product.available)) {
      toast.error('Algunos productos no están disponibles.', {
        duration: 3000
      })
      return
    }
    const auth = getCookie('AuthToken')
    if (!auth) {
      toast.error('Por favor inicie sesión para realizar el pedido.', {
        duration: 3000
      })
      setShowLogin(true)
      return
    }

    const response = await simulatePayment()

    if (!response.success) {
      toast.error(response.message, {
        duration: 3000
      })
      return
    }

    toast.success(response.message, {
      duration: 3000
    })
    clearCart()
  }

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
      {showLogin && (
        <div
          className={clsx(
            'absolute z-40 flex h-full w-full items-center justify-center',
            !showLogin && 'pointer-events-none'
          )}>
          <div
            className='fixed left-0 top-0 h-dvh w-dvw overflow-hidden after:absolute after:top-0 after:z-40 after:h-full after:w-full after:bg-primary-black/30'
            onClick={() => setShowLogin(false)}></div>
          <LoginForm onSubmit={() => setShowLogin(false)} />
        </div>
      )}
      <section
        className={clsx(
          'bottom-0 z-30 flex h-[90%] w-[70%] flex-col rounded bg-primary-white text-primary-black transition-all duration-200',
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
            <div key={product.id} className='relative flex w-full'>
              {!product.available && (
                <div className='absolute top-0 flex size-full items-center justify-center rounded-md bg-primary-black/30'>
                  <p className='text-xl font-semibold'>
                    No disponible,{' '}
                    <button
                      className='text-red-500'
                      onClick={() => removeProductFromCart(product.id)}>
                      eliminar
                    </button>
                  </p>
                </div>
              )}
              <div className='flex w-full items-center justify-between gap-5 p-2'>
                <div className='flex items-center gap-5'>
                  <img
                    src={'https://via.placeholder.com/150'}
                    alt={product.name}
                    className='p-x size-16 rounded-md object-cover'
                  />
                  <div className='flex flex-col'>
                    <p>{product.name}</p>
                    <p>${product.price.toLocaleString('es-CO')}</p>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-3'>
                  <div className='grid grid-cols-3 items-center'>
                    <button
                      onClick={() => decrementProductInCart(product.id)}
                      className='flex items-center justify-center rounded p-1 transition-all hover:bg-primary-black/5 disabled:opacity-50 disabled:hover:bg-transparent'
                      disabled={product.quantity === 1 || !product.available}
                      aria-label='Decrement product quantity'
                      aria-disabled={
                        product.quantity === 1 || !product.available
                      }>
                      <MinusIcon className='size-6' />
                    </button>
                    <p className='select-none text-center'>
                      {product.quantity}
                    </p>
                    <button
                      onClick={() => incrementProductInCart(product.id)}
                      className='flex items-center justify-center rounded p-1 transition-all hover:bg-primary-black/5 disabled:opacity-50 disabled:hover:bg-transparent'
                      disabled={
                        product.quantity === product.stock || !product.available
                      }
                      aria-label='Increment product quantity'
                      aria-disabled={
                        product.quantity === product.stock || !product.available
                      }>
                      <PlusIcon className='size-6' />
                    </button>
                  </div>
                  <button
                    className='flex items-center justify-center rounded p-1 transition-all hover:bg-primary-black/5 disabled:opacity-50 disabled:hover:bg-transparent'
                    onClick={() => removeProductFromCart(product.id)}
                    aria-label='Remove item from cart'
                    disabled={!product.available}
                    aria-disabled={!product.available}>
                    <TrashIcon className='size-5' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>
        <footer className='flex justify-between p-5'>
          <p className='text-lg font-medium'>Total: ${price}</p>
          <form action={handlePayment}>
            <Button
              type='submit'
              className='border border-primary-black'
              aria-label='Place order'>
              Realizar pedido
            </Button>
          </form>
        </footer>
      </section>
    </div>
  )
}

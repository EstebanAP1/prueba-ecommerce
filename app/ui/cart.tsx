import clsx from 'clsx'
import { useProducts } from '@/app/lib/features/hooks/useProducts'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Cart() {
  const { cart, closeCart } = useProducts()

  const { products, show } = cart

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
        <main className='flex flex-col items-center justify-start px-10 py-16'></main>
      </section>
    </div>
  )
}

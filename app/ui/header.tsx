import { logout } from '@/app/lib/actions'
import {
  ShoppingCartIcon,
  ArrowLeftEndOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useProducts } from '@/app/lib/features/hooks/useProducts'

export default function Header() {
  const { openCart } = useProducts()
  return (
    <header className='grid w-full grid-cols-3 items-center justify-center bg-primary-white px-10 py-1 shadow'>
      <h2 className='text-xl font-semibold'>EcommerceApp</h2>
      <nav className='flex w-full select-none items-center justify-center gap-2'>
        <a
          href='#home'
          className='px-4 py-3 text-lg transition-all hover:scale-105 hover:bg-primary-white-hover'>
          Inicio
        </a>
        <a
          href='#products'
          className='px-4 py-3 text-lg hover:scale-105 hover:bg-primary-white-hover'>
          Productos
        </a>
      </nav>
      <div className='flex items-center justify-end gap-4'>
        <button
          className='p-2 hover:scale-105'
          onClick={openCart}
          aria-label='Open cart'>
          <ShoppingCartIcon className='size-6' />
        </button>
        <form action={logout}>
          <button className='p-2 hover:scale-105'>
            <ArrowLeftEndOnRectangleIcon className='size-6' />
          </button>
        </form>
      </div>
    </header>
  )
}

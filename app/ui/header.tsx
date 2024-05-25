import { logout } from '@/app/lib/actions'
import {
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <header className='fixed top-0 grid w-full grid-cols-3 items-center justify-center bg-primary-white px-10 py-3 shadow'>
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
        <button className='p-2 hover:scale-105'>
          <ShoppingCartIcon className='size-6' />
        </button>
        <form action={logout}>
          <button className='p-2 hover:scale-105'>
            <ArrowLeftOnRectangleIcon className='size-6' />
          </button>
        </form>
      </div>
    </header>
  )
}

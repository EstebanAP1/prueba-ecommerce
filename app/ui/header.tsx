import { logout } from '@/app/lib/actions'
import {
  ShoppingCartIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useProducts } from '@/app/lib/features/hooks/useEcommerce'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { toast } from 'sonner'

export default function Header() {
  const { cart, openCart } = useProducts()
  const token = getCookie('AuthToken')

  const handleOpenCart = () => {
    if (cart.products.length === 0) {
      toast.error('No hay productos en el carrito.')
      return
    }
    openCart()
  }

  const handleLogout = async () => {
    await logout()
    toast.message('Has cerrado sesión correctamente.')
  }

  const itemsInCart = cart.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  )

  return (
    <header className='grid w-full grid-cols-2 items-center justify-center bg-primary-white px-10 py-1 shadow'>
      <h2 className='text-xl font-semibold'>EcommerceApp</h2>
      <div className='flex items-center justify-end gap-4'>
        <button
          className='relative p-2 hover:scale-105'
          onClick={handleOpenCart}
          aria-label='Open cart'>
          <ShoppingCartIcon className='size-6' />
          {itemsInCart !== 0 && (
            <span className='absolute -right-1 top-0 flex size-5 items-center justify-center rounded-full bg-primary-black p-1 text-xs text-primary-white'>
              {itemsInCart}
            </span>
          )}
        </button>
        {token ? (
          <form action={handleLogout}>
            <button className='p-2 hover:scale-105' aria-label='Cerrar sesión'>
              <ArrowLeftEndOnRectangleIcon className='size-6' />
            </button>
          </form>
        ) : (
          <Link href='/login' className='p-2 hover:scale-105'>
            <ArrowRightEndOnRectangleIcon className='size-6' />
          </Link>
        )}
      </div>
    </header>
  )
}

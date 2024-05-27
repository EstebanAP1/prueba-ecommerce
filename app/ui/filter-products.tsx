import clsx from 'clsx'
import { useProducts } from '@/app/lib/features/hooks/useEcommerce'

export default function FilterProducts() {
  const { categories, loading, filterByCategory } = useProducts()

  return (
    <>
      {!loading && categories.list.length > 0 && (
        <div className='sticky top-2 z-20 flex w-full max-w-[90%] justify-around gap-24 overflow-x-auto rounded-md bg-primary-white/90 px-24 py-5 [scrollbar-width:none]'>
          {categories.list.map((category, index) => (
            <button
              key={index}
              onClick={() => filterByCategory(category.id)}
              aria-label={`Filter products by ${category.name}`}
              disabled={categories.selected === category.id}
              aria-disabled={categories.selected === category.id}
              className={clsx(
                'select-none rounded-md p-2 font-medium transition-all',
                categories.selected === category.id
                  ? 'bg-interactive'
                  : 'hover:bg-primary-black/10'
              )}>
              {category.name}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

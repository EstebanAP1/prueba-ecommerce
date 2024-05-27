import { useAppDispatch, useAppSelector } from '@/app/lib/store'
import {
  decrementProductAction,
  filterByCategoryAction,
  hideModalAction,
  incrementProductAction,
  initializeProductsAction,
  setLoadingAction,
  showModalAction,
  toggleCartAction
} from '@/app/lib/features/productsSlice'
import { Product } from '@/app/lib/definitions'
import { useRef } from 'react'

export function useProducts() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.filteredProducts)
  const loading = useAppSelector(state => state.loading)
  const categories = useAppSelector(state => state.categories)
  const modal = useAppSelector(state => state.modal)
  const cart = useAppSelector(state => state.cart)

  const setLoading = (loading: boolean) => {
    dispatch(setLoadingAction(loading))
  }

  const initializeProducts = useRef((products: Product[]) =>
    dispatch(initializeProductsAction(products))
  )

  const filterByCategory = (category: string) =>
    dispatch(filterByCategoryAction(category))

  const showModal = (product: Product) => dispatch(showModalAction(product))

  const incrementProduct = () => dispatch(incrementProductAction())

  const decrementProduct = () => dispatch(decrementProductAction())

  const hideModal = () => dispatch(hideModalAction())

  const hideModalRef = useRef(hideModal)

  const openCart = () => dispatch(toggleCartAction(true))

  const closeCart = () => dispatch(toggleCartAction(false))

  return {
    products,
    loading,
    categories,
    modal,
    cart,
    setLoading,
    initializeProducts: initializeProducts.current,
    filterByCategory,
    showModal,
    incrementProduct,
    decrementProduct,
    hideModal,
    hideModalRef: hideModalRef.current,
    openCart,
    closeCart
  }
}

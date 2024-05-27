import { useAppDispatch, useAppSelector } from '@/app/lib/store'
import {
  addToCartAction,
  decrementProductAction,
  decrementProductInCartAction,
  filterByCategoryAction,
  hideModalAction,
  incrementProductAction,
  incrementProductInCartAction,
  initializeProductsAction,
  removeProductFromCartAction,
  setLoadingAction,
  showModalAction,
  toggleCartAction
} from '@/app/lib/features/ecommerceSlice'
import { Cart, Product } from '@/app/lib/definitions'
import { useRef } from 'react'

export function useProducts() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.ecommerce.filteredProducts)
  const loading = useAppSelector(state => state.ecommerce.loading)
  const categories = useAppSelector(state => state.ecommerce.categories)
  const modal = useAppSelector(state => state.ecommerce.modal)
  const cart = useAppSelector(state => state.ecommerce.cart)

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

  const addToCart = () => dispatch(addToCartAction())

  const incrementProductInCart = (product_id: string) =>
    dispatch(incrementProductInCartAction(product_id))

  const decrementProductInCart = (product_id: string) =>
    dispatch(decrementProductInCartAction(product_id))

  const removeProductFromCart = (product_id: string) =>
    dispatch(removeProductFromCartAction(product_id))

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
    closeCart,
    addToCart,
    incrementProductInCart,
    decrementProductInCart,
    removeProductFromCart
  }
}

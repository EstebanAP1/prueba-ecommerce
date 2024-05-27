import { useAppDispatch, useAppSelector } from '@/app/lib/store'
import {
  addToCartAction,
  clearCartAction,
  decrementProductAction,
  decrementProductInCartAction,
  filterByCategoryAction,
  hideModalAction,
  incrementProductAction,
  incrementProductInCartAction,
  initializeCategoriesAction,
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
  const products = useAppSelector(state => state.ecommerce.products)
  const loading = useAppSelector(state => state.ecommerce.loading)
  const categories = useAppSelector(state => state.ecommerce.categories)
  const modal = useAppSelector(state => state.ecommerce.modal)
  const cart = useAppSelector(state => state.ecommerce.cart)

  const setLoading = useRef((loading: boolean) =>
    dispatch(setLoadingAction(loading))
  )

  const initializeProducts = useRef((products: Product[]) =>
    dispatch(initializeProductsAction(products))
  )

  const initializeCategories = useRef(
    (categories: Array<{ id: number; name: string }>) =>
      dispatch(initializeCategoriesAction(categories))
  )

  const filterByCategory = (categoryId: number) =>
    dispatch(filterByCategoryAction(categoryId))

  const showModal = (product: Product) => dispatch(showModalAction(product))

  const incrementProduct = () => dispatch(incrementProductAction())

  const decrementProduct = () => dispatch(decrementProductAction())

  const hideModal = useRef(() => dispatch(hideModalAction()))

  const openCart = () => dispatch(toggleCartAction(true))

  const closeCart = useRef(() => dispatch(toggleCartAction(false)))

  const addToCart = () => dispatch(addToCartAction())

  const incrementProductInCart = (product_id: number) =>
    dispatch(incrementProductInCartAction(product_id))

  const decrementProductInCart = (product_id: number) =>
    dispatch(decrementProductInCartAction(product_id))

  const removeProductFromCart = (product_id: number) =>
    dispatch(removeProductFromCartAction(product_id))

  const clearCart = () => dispatch(clearCartAction())

  return {
    products,
    loading,
    categories,
    modal,
    cart,
    setLoading: setLoading.current,
    initializeProducts: initializeProducts.current,
    initializeCategories: initializeCategories.current,
    filterByCategory,
    showModal,
    incrementProduct,
    decrementProduct,
    hideModal: hideModal.current,
    openCart,
    closeCart: closeCart.current,
    addToCart,
    incrementProductInCart,
    decrementProductInCart,
    removeProductFromCart,
    clearCart
  }
}

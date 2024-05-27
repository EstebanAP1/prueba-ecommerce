import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Cart, Product } from '@/app/lib/definitions'
import {
  getRecommendations,
  updateRecommendationsCookie
} from '@/app/lib/utils'
import { toast } from 'sonner'

const initialState = {
  products: [] as Product[],
  categories: {
    selected: 0,
    list: [] as Array<{ id: number; name: string }>
  },
  modal: {
    show: false,
    product: {
      id: 0,
      name: '',
      description: '',
      quantity: 0,
      price: 0,
      discount: 0,
      image: '',
      stock: 0,
      available: false,
      categoryId: 0
    } as Cart
  },
  cart: {
    show: false,
    products: [] as Cart[]
  },
  loading: false
}

export const ecommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    setLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    initializeProductsAction: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      const recommendations = getRecommendations()
      const recommended = state.products
        .filter(product => recommendations.includes(product.id.toString()))
        .sort(
          (a, b) =>
            recommendations.indexOf(a.id.toString()) -
            recommendations.indexOf(b.id.toString())
        )

      const nonRecommended = state.products.filter(
        product => !recommendations.includes(product.id.toString())
      )

      state.cart.products = state.cart.products.map(product => {
        const updatedProduct = state.products.some(p => p.id === product.id)
        if (!updatedProduct) return { ...product, available: false }
        return product
      })
      state.products = [...recommended, ...nonRecommended]
      state.loading = false
    },
    initializeCategoriesAction: (
      state,
      action: PayloadAction<Array<{ id: number; name: string }>>
    ) => {
      state.categories.list = [{ id: 0, name: 'all' }, ...action.payload]
    },
    filterByCategoryAction: (state, action: PayloadAction<number>) => {
      state.categories.selected = action.payload
    },
    showModalAction: (state, action: PayloadAction<Product>) => {
      state.modal.show = true

      state.modal.product = { ...action.payload, quantity: 1, available: true }

      updateRecommendationsCookie(action.payload.id)
    },
    hideModalAction: state => {
      state.modal.show = false
      state.modal.product = initialState.modal.product
    },
    incrementProductAction: state => {
      const inCart = state.cart.products.find(
        product => product.id === state.modal.product.id
      )?.quantity
      if (inCart) {
        const totalStock = state.modal.product.stock - inCart
        if (totalStock === 0) {
          toast.error('No hay más stock disponible, revisa tu carrito.')
          return
        }
        if (state.modal.product.quantity === totalStock) return
        state.modal.product.quantity += 1
        return
      }
      if (state.modal.product.quantity === state.modal.product.stock) return
      state.modal.product.quantity += 1
    },
    decrementProductAction: state => {
      if (state.modal.product.quantity === 1) return
      state.modal.product.quantity -= 1
    },
    toggleCartAction: (state, action: PayloadAction<boolean>) => {
      state.cart.show = action.payload
    },
    addToCartAction: state => {
      const inCart = state.cart.products.find(
        product => product.id === state.modal.product.id
      )

      updateRecommendationsCookie(state.modal.product.id)

      state.modal.show = false
      toast.success('Producto agregado al carrito.')

      if (inCart) {
        inCart.quantity += state.modal.product.quantity
        state.modal.product = initialState.modal.product
        return
      }

      state.cart.products.push(state.modal.product)
      state.modal.product = initialState.modal.product
    },
    incrementProductInCartAction: (state, action: PayloadAction<number>) => {
      const inCart = state.cart.products.find(
        product => product.id === action.payload
      )

      if (inCart) {
        const totalStock = inCart.stock - inCart.quantity
        if (totalStock === 0) {
          toast.error('No hay más stock disponible.')
          return
        }
        inCart.quantity += 1
        return
      }
      toast.error('No se encontró el producto en el carrito.')
    },
    decrementProductInCartAction: (state, action: PayloadAction<number>) => {
      const inCart = state.cart.products.find(
        product => product.id === action.payload
      )

      if (inCart) {
        if (inCart.quantity === 1) return
        inCart.quantity -= 1
        return
      }
      toast.error('No se encontró el producto en el carrito.')
    },
    removeProductFromCartAction: (state, action: PayloadAction<number>) => {
      state.cart.products = state.cart.products.filter(
        product => product.id !== action.payload
      )
    },
    clearCartAction: state => {
      state.cart.products = []
      state.cart.show = false
    }
  }
})

export default ecommerceSlice.reducer

export const {
  setLoadingAction,
  initializeProductsAction,
  initializeCategoriesAction,
  filterByCategoryAction,
  showModalAction,
  hideModalAction,
  incrementProductAction,
  decrementProductAction,
  toggleCartAction,
  addToCartAction,
  incrementProductInCartAction,
  decrementProductInCartAction,
  removeProductFromCartAction,
  clearCartAction
} = ecommerceSlice.actions

import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Cart, Product } from '@/app/lib/definitions'
import {
  getRecommendations,
  updateRecommendationsCookie
} from '@/app/lib/utils'
import { toast } from 'sonner'

const initialState = {
  products: [] as Product[],
  filteredProducts: [] as Product[],
  categories: {
    selected: 'all',
    list: ['all', 'electronics', 'clothes', 'books']
  },
  modal: {
    show: false,
    product: {
      id: '',
      name: '',
      description: '',
      quantity: 0,
      price: 0,
      discount: 0,
      image: '',
      stock: 0
    } as Cart
  },
  cart: {
    show: false,
    products: [] as Cart[]
  },
  loading: true
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
        .filter(product => recommendations.includes(product.id))
        .sort(
          (a, b) =>
            recommendations.indexOf(a.id) - recommendations.indexOf(b.id)
        )

      const nonRecommended = state.products.filter(
        product => !recommendations.includes(product.id)
      )

      state.filteredProducts = [...recommended, ...nonRecommended]
      state.loading = false
    },
    filterByCategoryAction: (state, action: PayloadAction<string>) => {
      const recommendations = getRecommendations()
      const recommended = state.products.filter(product =>
        recommendations.includes(product.id)
      )
      const nonRecommended = state.products.filter(
        product => !recommendations.includes(product.id)
      )

      if (action.payload === 'all') {
        state.filteredProducts = [...recommended, ...nonRecommended]
        state.categories.selected = 'all'
        return
      }
      state.categories.selected = action.payload
      const products = [...recommended, ...nonRecommended]
      state.filteredProducts = products.filter(
        product => product.category === action.payload
      )
    },
    showModalAction: (state, action: PayloadAction<Product>) => {
      state.modal.show = true

      state.modal.product = { ...action.payload, quantity: 1 }

      updateRecommendationsCookie(action.payload.id)
    },
    hideModalAction: state => {
      state.modal.show = false
      state.modal.product = {
        id: '',
        name: '',
        description: '',
        quantity: 0,
        price: 0,
        discount: 0,
        image: '',
        category: '',
        stock: 0
      }
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
        state.modal.product = {
          id: '',
          name: '',
          description: '',
          quantity: 0,
          price: 0,
          discount: 0,
          image: '',
          category: '',
          stock: 0
        }
        return
      }

      state.cart.products.push(state.modal.product)
      state.modal.product = {
        id: '',
        name: '',
        description: '',
        quantity: 0,
        price: 0,
        discount: 0,
        image: '',
        category: '',
        stock: 0
      }
    },
    incrementProductInCartAction: (state, action: PayloadAction<string>) => {
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
    decrementProductInCartAction: (state, action: PayloadAction<string>) => {
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
    removeProductFromCartAction: (state, action: PayloadAction<string>) => {
      state.cart.products = state.cart.products.filter(
        product => product.id !== action.payload
      )
    }
  }
})

export default ecommerceSlice.reducer

export const {
  setLoadingAction,
  initializeProductsAction,
  filterByCategoryAction,
  showModalAction,
  hideModalAction,
  incrementProductAction,
  decrementProductAction,
  toggleCartAction,
  addToCartAction,
  incrementProductInCartAction,
  decrementProductInCartAction,
  removeProductFromCartAction
} = ecommerceSlice.actions

import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Cart, Product } from '@/app/lib/definitions'

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
      id: 0,
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

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    initializeProductsAction: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      state.filteredProducts = action.payload
      state.loading = false
    },
    filterByCategoryAction: (state, action: PayloadAction<string>) => {
      if (action.payload === 'all') {
        state.filteredProducts = state.products
        state.categories.selected = 'all'
        return
      }
      state.categories.selected = action.payload
      state.filteredProducts = state.products.filter(
        product => product.category === action.payload
      )
    },
    showModalAction: (state, action: PayloadAction<Product>) => {
      state.modal.show = true
      const inCart = state.cart.products.find(
        product => product.id === action.payload.id
      )
      if (inCart) {
        state.modal.product = inCart
        return
      }
      state.modal.product = { ...action.payload, quantity: 1 }
    },
    hideModalAction: state => {
      state.modal.show = false
      state.modal.product = {
        id: 0,
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
      if (state.modal.product.quantity === state.modal.product.stock) return
      state.modal.product.quantity += 1
    },
    decrementProductAction: state => {
      if (state.modal.product.quantity === 1) return
      state.modal.product.quantity -= 1
    },
    toggleCartAction: (state, action: PayloadAction<boolean>) => {
      state.cart.show = action.payload
    }
  }
})

export default productsSlice.reducer

export const {
  setLoadingAction,
  initializeProductsAction,
  filterByCategoryAction,
  showModalAction,
  hideModalAction,
  incrementProductAction,
  decrementProductAction,
  toggleCartAction
} = productsSlice.actions

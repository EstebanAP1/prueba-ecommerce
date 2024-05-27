import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ecommerceSlice from '@/app/lib/features/ecommerceSlice'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import { persistReducer } from 'redux-persist'

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value)
    },
    removeItem() {
      return Promise.resolve()
    }
  }
}

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

const persistConfig = {
  key: `ecommerce`,
  version: 0.1,
  storage: storage,
  whitelist: ['cart']
}

const persistedEcommerceReducer = persistReducer(persistConfig, ecommerceSlice)

const rootReducer = combineReducers({
  ecommerce: persistedEcommerceReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

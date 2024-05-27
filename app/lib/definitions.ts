export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  discount: number
  categoryId: number
  stock: number
}

export interface Cart extends Product {
  quantity: number
  available: boolean
}

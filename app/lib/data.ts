'use server'

export async function getProducts() {
  try {
    const apiUrl = process.env.API_URL
    const response = await fetch(`${apiUrl}/products`)

    if (!response.ok) throw new Error('Error fetching products')

    const data = await response.json()

    return {
      success: true,
      data
    }
  } catch (error) {
    return {
      success: false,
      message:
        'Ha ocurrido un error cargando los productos. Por favor intenta más tarde.'
    }
  }
}

export async function getCategories() {
  try {
    const apiUrl = process.env.API_URL
    const response = await fetch(`${apiUrl}/categories`)
    if (!response.ok) throw new Error('Error fetching categories')
    return {
      success: true,
      data: await response.json()
    }
  } catch (error) {
    return {
      success: false,
      message:
        'Ha ocurrido un error cargando las categorías. Por favor intenta más tarde.'
    }
  }
}

// Promise.resolve([
//   {
//     id: '1',
//     name: 'Product 1',
//     price: 10000,
//     image: 'https://via.placeholder.com/150',
//     description: 'Description 1',
//     discount: 0,
//     category: 'electronics',
//     stock: 10
//   },
//   {
//     id: '2',
//     name: 'Product 2',
//     price: 14900,
//     image: 'https://via.placeholder.com/150',
//     description: 'Description 2',
//     discount: 0,
//     category: 'clothes',
//     stock: 0
//   },
//   {
//     id: '3',
//     name: 'Product 3',
//     price: 25000,
//     image: 'https://via.placeholder.com/150',
//     description: 'Description 3',
//     discount: 0,
//     category: 'books',
//     stock: 30
//   },
//   {
//     id: '4',
//     name: 'Product 4',
//     price: 50000,
//     image: 'https://via.placeholder.com/150',
//     description: 'Description 4',
//     discount: 10,
//     category: 'electronics',
//     stock: 40
//   },
//   {
//     id: '5',
//     name: 'Product 5',
//     price: 12000,
//     image: 'https://via.placeholder.com/150',
//     description: 'Description 5',
//     discount: 15,
//     category: 'clothes',
//     stock: 50
//   },
//   {
//     id: '6',
//     name: 'Product 6',
//     price: 34000,
//     image: 'https://via.placeholder.com/150',
//     description: 'Description 6',
//     discount: 20,
//     category: 'books',
//     stock: 60
//   },
//   {
//     id: '7',
//     name: 'Product 7',
//     price: 35900,
//     image: 'https://via.placeholder.com/150',
//     description: 'Description 7',
//     discount: 0,
//     category: 'electronics',
//     stock: 70
//   },
//   {
//     id: '8',
//     name: 'Product 8',
//     price: 23900,
//     image: 'https://via.placeholder.com/150',
//     description: 'Description 8',
//     discount: 0,
//     category: 'clothes',
//     stock: 80
//   },
//   {
//     id: '9',
//     name: 'Product 9',
//     price: 21000,
//     image: 'https://via.placeholder.com/150',
//     description: 'Description 9',
//     discount: 0,
//     category: 'books',
//     stock: 90
//   },
//   {
//     id: '10',
//     name: 'Product 10',
//     price: 23000,
//     image: 'https://via.placeholder.com/150',
//     description: 'Description 10',
//     discount: 25,
//     category: 'electronics',
//     stock: 100
//   }
// ])

'use server'

import { Product } from '@/app/lib/definitions'

export async function getProducts(): Promise<Product[]> {
  const products = await Promise.resolve([
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      image: 'https://via.placeholder.com/150',
      description: 'Description 1',
      discount: 0,
      stock: 10
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://via.placeholder.com/150',
      description: 'Description 2',
      discount: 0,
      stock: 20
    },
    {
      id: 3,
      name: 'Product 3',
      price: 300,
      image: 'https://via.placeholder.com/150',
      description: 'Description 3',
      discount: 0,
      stock: 30
    },
    {
      id: 4,
      name: 'Product 4',
      price: 400,
      image: 'https://via.placeholder.com/150',
      description: 'Description 4',
      discount: 10,
      stock: 40
    },
    {
      id: 5,
      name: 'Product 5',
      price: 500,
      image: 'https://via.placeholder.com/150',
      description: 'Description 5',
      discount: 15,
      stock: 50
    },
    {
      id: 6,
      name: 'Product 6',
      price: 600,
      image: 'https://via.placeholder.com/150',
      description: 'Description 6',
      discount: 20,
      stock: 60
    },
    {
      id: 7,
      name: 'Product 7',
      price: 700,
      image: 'https://via.placeholder.com/150',
      description: 'Description 7',
      discount: 0,
      stock: 70
    },
    {
      id: 8,
      name: 'Product 8',
      price: 800,
      image: 'https://via.placeholder.com/150',
      description: 'Description 8',
      discount: 0,
      stock: 80
    },
    {
      id: 9,
      name: 'Product 9',
      price: 900,
      image: 'https://via.placeholder.com/150',
      description: 'Description 9',
      discount: 0,
      stock: 90
    },
    {
      id: 10,
      name: 'Product 10',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      description: 'Description 10',
      discount: 25,
      stock: 100
    }
  ])

  return products
}

'use server'

import z from 'zod'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Product } from '@/app/lib/definitions'

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Por favor ingrese un correo.',
      invalid_type_error: 'Por favor ingrese un correo válido.'
    })
    .email({ message: 'Por favor ingrese un correo válido.' }),
  password: z
    .string({
      required_error: 'Por favor ingrese una contraseña',
      invalid_type_error: 'Por favor ingrese una contraseña válida.'
    })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
})

type State = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string
}

export async function authenticate(prevState: State, formData: FormData) {
  let login = false
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const type = formData.get('type') as string
    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success)
      return {
        errors: validation.error.flatten().fieldErrors,
        message:
          validation.error.flatten().fieldErrors.email?.[0] ||
          validation.error.flatten().fieldErrors.password?.[0] ||
          ''
      }

    // TODO: Send credentials and type to endpoint

    login = true
    const token = '1234'

    cookies().set('AuthToken', token)
  } catch (error) {
    return { message: 'Lo siento, hemos tenido un error al iniciar sesión.' }
  }
  if (login) redirect('/')
  return { message: 'Credenciales incorrectas.' }
}

const registerSchema = z.object({
  name: z.string({
    required_error: 'Por favor ingrese su nombre.',
    invalid_type_error: 'Por favor ingrese un nombre válido.'
  }),
  email: z
    .string({
      required_error: 'Por favor ingrese un correo.',
      invalid_type_error: 'Por favor ingrese un correo válido.'
    })
    .email({ message: 'Por favor ingrese un correo válido.' }),
  password: z
    .string({
      required_error: 'Por favor ingrese una contraseña',
      invalid_type_error: 'Por favor ingrese una contraseña válida.'
    })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
})

export async function register(prevState: State, formData: FormData) {
  let redirection = false
  try {
    const validation = registerSchema.safeParse(Object.fromEntries(formData))
    if (!validation.success)
      return {
        errors: validation.error.flatten().fieldErrors,
        message:
          validation.error.flatten().fieldErrors.name?.[0] ||
          validation.error.flatten().fieldErrors.email?.[0] ||
          validation.error.flatten().fieldErrors.password?.[0] ||
          ''
      }

    // TODO: Register user with endpoint

    redirection = true
  } catch (error) {
    return { message: 'Lo siento, hemos tenido un error con el registro.' }
  }
  if (redirection) {
    return {
      message: '¡Registro exitoso! Por favor inicie sesión.',
      redirection: true
    }
  }

  return { message: 'Lo siento, hemos tenido un error con el registro.' }
}

export async function logout() {
  try {
    const apiUrl = process.env.API_URL
    const token = cookies().get('AuthToken')?.value
    // await fetch(`${apiUrl}/auth/logout`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application',
    //     'Authorization': `Bearer ${token}`
    //   }
    // })
  } catch (error) {}
  cookies().delete('AuthToken')
  redirect('/login')
}

export async function addToCart(product: Product) {
  try {
    const token = cookies().get('AuthToken')?.value
    // const response = await fetch(`${apiUrl}/cart/add`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(product)
    // })

    return {
      success: true,
      message: 'Producto agregado al carrito.',
      redirection: false
    }
  } catch (error) {
    return {
      success: false,
      message: 'Lo siento, hemos tenido un error al agregar el producto.',
      redirection: false
    }
  }
}

export async function removeFromCart(product: Product) {
  try {
    const token = cookies().get('AuthToken')?.value
    // const response = await fetch(`${apiUrl}/cart/remove`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(product)
    // })

    return { message: 'Producto eliminado del carrito.', redirection: false }
  } catch (error) {
    return {
      message: 'Lo siento, hemos tenido un error al eliminar el producto.',
      redirection: false
    }
  }
}

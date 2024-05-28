'use server'

import z from 'zod'
import { cookies } from 'next/headers'

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
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  try {
    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success)
      return {
        errors: validation.error.flatten().fieldErrors,
        message:
          validation.error.flatten().fieldErrors.email?.[0] ||
          validation.error.flatten().fieldErrors.password?.[0] ||
          '',
        success: false
      }

    const apiUrl = process.env.API_URL
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username: email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 401) {
      return {
        message: 'El correo ingresado no existe o la contraseña es incorrecta.',
        success: false
      }
    }

    if (!response.ok) throw new Error('Error logging in')

    const token = await response.text()
    if (!token)
      return {
        message: 'El correo ingresado no existe o la contraseña es incorrecta.',
        success: false
      }

    cookies().set('AuthToken', token, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7
    })
    return { message: 'Sesión iniciada correctamente.', success: true }
  } catch (error) {
    return {
      message: 'Lo siento, hemos tenido un error al iniciar sesión.',
      success: false
    }
  }
}

export async function googleLogin() {
  const apiUrl = process.env.API_URL
  return `${apiUrl}/auth/google/login`
}

export async function facebookLogin() {
  const apiUrl = process.env.API_URL
  return `${apiUrl}/auth/facebook/login`
}

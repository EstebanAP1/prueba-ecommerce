'use server'

import z from 'zod'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Por favor ingrese un correo.'
    })
    .email({ message: 'Por favor ingrese un correo válido.' }),
  password: z
    .string({ required_error: 'Por favor ingrese una contraseña' })
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
    const validation = loginSchema.safeParse(Object.fromEntries(formData))
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

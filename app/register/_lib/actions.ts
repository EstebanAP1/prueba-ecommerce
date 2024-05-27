'use server'

import z from 'zod'

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

type State = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string
}

export async function register(prevState: State, formData: FormData) {
  try {
    const validation = registerSchema.safeParse(Object.fromEntries(formData))
    if (!validation.success)
      return {
        errors: validation.error.flatten().fieldErrors,
        message:
          validation.error.flatten().fieldErrors.name?.[0] ||
          validation.error.flatten().fieldErrors.email?.[0] ||
          validation.error.flatten().fieldErrors.password?.[0] ||
          '',
        redirection: false
      }

    const apiUrl = process.env.API_URL
    const response = await fetch(`${apiUrl}/user/register`, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) throw new Error('Error registrando usuario')

    return {
      message: '¡Registro exitoso! Por favor inicie sesión.',
      redirection: true
    }
  } catch (error) {
    return {
      message: 'Lo siento, hemos tenido un error con el registro.',
      redirection: false
    }
  }
}

'use server'

import { cookies } from 'next/headers'

export async function logout() {
  try {
    const apiUrl = process.env.API_URL
    const token = cookies().get('AuthToken')?.value
    await fetch(`${apiUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application',
        'Authorization': `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log(error)
  }
  cookies().delete('AuthToken')
}

export async function simulatePayment() {
  try {
    const apiUrl = process.env.API_URL
    const token = cookies().get('AuthToken')?.value
    const response = await fetch(`${apiUrl}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application',
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.status === 401) {
      cookies().delete('AuthToken')
      return {
        success: false,
        message:
          'Tenemos problemas con tu sesión. Por favor, inicia sesión de nuevo.'
      }
    }

    if (!response.ok) throw new Error('Ha ocurrido un problema con el pago.')
    const data = await response.json()

    if (!data) {
      return {
        success: false,
        message:
          'Ha ocurrido un problema con el pago. Por favor, intenta de nuevo.'
      }
    }
    return {
      success: true,
      message: 'Pago realizado correctamente.'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Ha ocurrido un problema interno. Por favor, intenta de nuevo.'
    }
  }
}

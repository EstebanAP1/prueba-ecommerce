'use client'

import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/app/lib/actions'
import { Input } from '@/app/ui/input'
import { Button } from '@/app/ui/button'
import {
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { toast } from 'sonner'
import Link from 'next/link'

export default function LoginPage() {
  const initialState = {
    errors: {},
    message: ''
  }
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [state, login] = useFormState(authenticate, initialState)

  useEffect(() => {
    if (state.message) {
      toast.error(state.message, {
        duration: 5000
      })
    }
  }, [state])

  const changeVisibility = () => {
    document.getElementById('password')?.focus()
    setVisible(!visible)
  }

  return (
    <section className='m-auto flex min-w-[30%] select-none flex-col items-center justify-center gap-16 self-center rounded-md bg-secondary-white p-10 shadow-lg'>
      <header className='flex items-center justify-center'>
        <h1 className='text-3xl font-bold'>Iniciar sesión</h1>
      </header>
      <main className='flex w-full items-center'>
        <form
          action={login}
          className='flex w-full flex-col items-center gap-5'>
          <div className='relative flex w-full items-start'>
            <Input
              type='text'
              id='email'
              name='email'
              placeholder=''
              className={clsx('peer', state.errors?.email && 'border-red-500')}
              value={email}
              onChange={event =>
                setEmail(event.target.value.replace(/\s/g, ''))
              }
              autoFocus
              autoComplete='off'
              spellCheck={false}
              aria-required
            />
            <label
              htmlFor='email'
              className='absolute start-2.5 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform cursor-text bg-secondary-white px-1 text-primary-black transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75'>
              Email
            </label>
          </div>
          <div className='relative flex w-full items-start'>
            <Input
              type={visible ? 'text' : 'password'}
              id='password'
              name='password'
              value={password}
              placeholder=''
              onChange={event => setPassword(event.target.value)}
              className={clsx(
                'peer rounded-r-none border-r-0',
                state.errors?.password && 'border-red-500'
              )}
              spellCheck={false}
              aria-required
            />
            <label
              htmlFor='password'
              className='absolute start-2.5 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform cursor-text bg-secondary-white px-1 text-primary-black transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75'>
              Ingresa tu contraseña
            </label>
            <span
              className={clsx(
                'flex cursor-pointer items-center justify-center rounded-r-md border border-l-0 border-primary-black bg-secondary-white p-2',
                state.errors?.password && 'border-red-500'
              )}
              onClick={changeVisibility}>
              {visible ? (
                <EyeIcon
                  className={clsx(
                    'size-6 text-primary-black',
                    state.errors?.password && 'text-red-500'
                  )}
                />
              ) : (
                <EyeSlashIcon
                  className={clsx(
                    'size-6 text-primary-black',
                    state.errors?.password && 'text-red-500'
                  )}
                />
              )}
            </span>
          </div>
          <LoginButton />
        </form>
      </main>
      <footer className='flex flex-col items-center justify-center'>
        <p className='text-sm'>¿No estás registrado?</p>
        <Link href='/register' className='text-sm text-blue-500'>
          Regístrate
        </Link>
      </footer>
    </section>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type='submit'
      className={`group flex w-full flex-row items-center justify-start gap-1 ${
        pending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      aria-disabled={pending}
      disabled={pending}>
      Iniciar sesión
      <div className='transition-all group-hover:flex-1 group-focus:flex-1'></div>
      <ArrowRightIcon className='text-secondary size-5' />
    </Button>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { toast } from 'sonner'
import { register } from '@/app/register/_lib/actions'
import { Button } from '@/app/ui/button'
import { Input } from '@/app/ui/input'
import {
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'

export default function RegisterPage() {
  const { push } = useRouter()
  const initialState = {
    errors: {},
    message: '',
    redirection: false
  }
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [state, dispatch] = useFormState(register, initialState)

  useEffect(() => {
    if (state.redirection) {
      toast.success(state.message)
      push('/login')
      return
    }
    if (state.message && !state.redirection) {
      toast.error(state.message, {
        duration: 5000
      })
    }
  }, [state, push])

  const changeVisibility = () => {
    const input = document.getElementById('password')
    input?.focus()
    setVisible(!visible)
  }

  return (
    <section className='m-auto flex min-w-[30%] select-none flex-col items-center justify-center gap-16 self-center rounded-md bg-secondary-white p-10 shadow-lg'>
      <header className='flex items-center justify-center'>
        <h1 className='text-3xl font-bold'>Regístrate</h1>
      </header>
      <main className='flex w-full items-center'>
        <form
          action={dispatch}
          className='flex w-full flex-col items-center gap-5'>
          <div className='relative flex w-full items-start'>
            <Input
              type='text'
              id='name'
              name='name'
              placeholder=''
              className={clsx('peer', state.errors?.name && 'border-red-500')}
              value={name}
              onChange={event => setName(event.target.value)}
              autoFocus
              autoComplete='off'
              spellCheck={false}
              aria-required
            />
            <label
              htmlFor='name'
              className='pointer-events-none absolute start-2.5 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform cursor-text bg-secondary-white px-1 text-primary-black transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75'>
              Nombre
            </label>
          </div>
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
              autoComplete='off'
              spellCheck={false}
              aria-required
            />
            <label
              htmlFor='email'
              className='pointer-events-none absolute start-2.5 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform cursor-text bg-secondary-white px-1 text-primary-black transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75'>
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
              className='absolute start-2.5 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform cursor-text bg-secondary-white px-1 text-primary-black transition-all duration-200 pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75'>
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
          <RegisterButton />
        </form>
      </main>
      <footer className='flex flex-col items-center justify-center'>
        <p className='text-sm'>¿Ya tienes una cuenta?</p>
        <Link href='/login' className='text-sm text-blue-500'>
          Inicia sesión
        </Link>
      </footer>
    </section>
  )
}

function RegisterButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type='submit'
      className={`group flex w-full flex-row items-center justify-start gap-1 ${
        pending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      aria-disabled={pending}
      disabled={pending}>
      Regístrate
      <div className='transition-all group-hover:flex-1 group-focus:flex-1'></div>
      <ArrowRightIcon className='text-secondary size-5' />
    </Button>
  )
}

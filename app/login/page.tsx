'use client'

import { useRouter } from 'next/navigation'
import LoginForm from '@/app/ui/login-form'

export default function LoginPage() {
  const { push } = useRouter()
  const onSubmit = () => {
    push('/')
  }

  return <LoginForm onSubmit={onSubmit} />
}

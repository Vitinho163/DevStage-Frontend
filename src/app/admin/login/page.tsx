'use client'

import { Button } from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { postAdminLogin } from '@/http/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Lock, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import logo from '../../../assets/logo.svg'

const loginSchema = z.object({
  email: z.string().email('Digite um e-mail válido'),
  password: z.string().min(8, 'Digite uma senha com no mínimo 8 caracteres'),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function AdminLogin() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      router.push('/admin/dashboard')
    }
  }, [router])

  async function handleLogin({ email, password }: LoginSchema) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await postAdminLogin({ email, password })

      if (!response?.accessToken) {
        throw new Error('Token não recebido')
      }

      localStorage.setItem('accessToken', response.accessToken)
      router.push('/admin/dashboard')
    } catch (error) {
      localStorage.removeItem('accessToken')
      setError(error instanceof Error ? error.message : 'Falha no login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image
            src={logo}
            alt="devstage"
            width={108.5}
            height={30}
            className="mb-4"
          />
          <h1 className="text-2xl font-heading font-medium text-blue">
            Admin Login
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-gray-700 border border-gray-600 rounded-2xl p-8 space-y-6 w-full"
        >
          <h2 className="font-heading font-semibold text-gray-200 text-xl">
            Acesso Administrativo
          </h2>

          <div className="space-y-3">
            <div className="space-y-2">
              <InputRoot>
                <InputIcon>
                  <User />
                </InputIcon>
                <InputField
                  type="email"
                  placeholder="E-mail"
                  {...register('email')}
                />
              </InputRoot>

              {errors?.email && (
                <p className="text-danger text-xs font-semibold">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <InputRoot>
                <InputIcon>
                  <Lock />
                </InputIcon>
                <InputField
                  type="password"
                  placeholder="Senha"
                  {...register('password')}
                />
              </InputRoot>

              {errors?.password && (
                <p className="text-danger text-xs font-semibold">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <p className="text-danger text-center text-sm font-semibold">
              {error}
            </p>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Carregando...' : 'Entrar'}
            <ArrowRight />
          </Button>
        </form>
      </div>
    </div>
  )
}

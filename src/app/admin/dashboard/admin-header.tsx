'use client'

import { Button } from '@/components/button'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '../../../assets/logo.svg'

export default function AdminHeader() {
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem('accessToken')
    router.push('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image src={logo} alt="devstage" width={86.8} height={24} />
          <h1 className="text-xl font-heading font-medium text-blue hidden sm:block">
            CodeCraft <span className="text-gray-200">Admin</span>
          </h1>
        </div>

        <Button
          onClick={handleLogout}
          className="flex justify-between items-center gap-2 px-3 py-2 bg-gray-700 text-gray-200 font-semibold rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-600"
        >
          <LogOut className="size-4" />
          <span>Sair</span>
        </Button>
      </div>
    </header>
  )
}

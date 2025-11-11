'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuthContext } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  Home, 
  ShoppingCart, 
  TrendingUp, 
  History, 
  Settings,
  LogOut,
  User,
  Building2
} from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuthContext()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Imóveis', href: '/imoveis', icon: Building2 },
    { name: 'Comprar', href: '/comprar', icon: ShoppingCart },
    { name: 'Vender', href: '/vender', icon: TrendingUp },
    { name: 'Histórico', href: '/transacoes', icon: History },
  ]

  return (
    <nav className="flex justify-between items-center bg-[#0D0F11] px-6 py-4 border-b border-[#1C1C1C]">
      <div className="flex items-center gap-2">
        <Image src="/logo-bemconcreto.svg" width={28} height={28} alt="Bem Concreto" />
        <span className="text-[#F2F2F2] font-semibold text-lg">Bem Concreto</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {user && navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className="text-[#F2F2F2] hover:text-[#BFA89C] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
        
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-[#F2F2F2]">
              <User className="w-4 h-4" />
              <span className="text-sm">{user.email}</span>
            </div>
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="border-[#6B4A3E] text-[#6B4A3E] hover:bg-[#2A2D31]"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sair
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="border-[#6B4A3E] text-[#6B4A3E] hover:bg-[#2A2D31]"
              >
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button
                size="sm"
                className="bg-[#6B4A3E] text-white px-3 py-1.5 rounded-lg hover:bg-[#5B3C33]"
              >
                BCT Token
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#F2F2F2] hover:text-[#BFA89C] p-2"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-[#0D0F11] border-t border-[#1C1C1C] z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user && navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[#F2F2F2] hover:text-[#BFA89C] block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            
            {user ? (
              <div className="pt-4 border-t border-[#1C1C1C]">
                <div className="px-3 py-2 text-[#F2F2F2] text-sm">
                  {user.email}
                </div>
                <button
                  onClick={() => {
                    signOut()
                    setIsMenuOpen(false)
                  }}
                  className="text-[#F2F2F2] hover:text-[#BFA89C] block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-[#1C1C1C] space-y-2">
                <Link
                  href="/login"
                  className="block px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full border-[#6B4A3E] text-[#6B4A3E] hover:bg-[#2A2D31]"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link
                  href="/cadastro"
                  className="block px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    className="w-full bg-[#6B4A3E] text-white hover:bg-[#5B3C33]"
                  >
                    BCT Token
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
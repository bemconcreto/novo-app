'use client'

import { useState, useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft,
  History,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react'
import Link from 'next/link'

interface DashboardData {
  saldoBCT: number
  saldoBRL: number
  cotacao: number
  variacao24h: number
  ultimasTransacoes: Array<{
    id: string
    tipo: 'compra' | 'venda' | 'transferência'
    valor: number
    data: string
    status: 'concluído' | 'pendente' | 'falhou'
  }>
}

export default function DashboardPage() {
  const { user } = useAuthContext()
  const [data, setData] = useState<DashboardData>({
    saldoBCT: 1250.75,
    saldoBRL: 3126.88,
    cotacao: 2.50,
    variacao24h: 5.2,
    ultimasTransacoes: [
      {
        id: '1',
        tipo: 'compra',
        valor: 500,
        data: '2024-01-15T10:30:00Z',
        status: 'concluído'
      },
      {
        id: '2',
        tipo: 'venda',
        valor: 250,
        data: '2024-01-14T15:45:00Z',
        status: 'concluído'
      },
      {
        id: '3',
        tipo: 'compra',
        valor: 1000,
        data: '2024-01-13T09:15:00Z',
        status: 'pendente'
      }
    ]
  })
  const [showBalance, setShowBalance] = useState(true)
  const [loading, setLoading] = useState(false)

  const refreshData = async () => {
    setLoading(true)
    // Simular carregamento de dados
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluído':
        return 'bg-green-100 text-green-800'
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800'
      case 'falhou':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTransactionIcon = (tipo: string) => {
    switch (tipo) {
      case 'compra':
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />
      case 'venda':
        return <ArrowUpRight className="w-4 h-4 text-blue-600" />
      default:
        return <ArrowUpRight className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0C3D2E] mb-2">
              Dashboard
            </h1>
            <p className="text-[#111827]/60">
              Bem-vindo de volta, {user?.email?.split('@')[0]}!
            </p>
          </div>
          <Button
            onClick={refreshData}
            disabled={loading}
            variant="outline"
            className="border-[#12B76A] text-[#12B76A] hover:bg-[#12B76A] hover:text-white mt-4 sm:mt-0"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* BCT Balance */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#12B76A] to-[#0F9A5A] text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Saldo BCT
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Wallet className="h-4 w-4 opacity-90" />
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="opacity-90 hover:opacity-100"
                >
                  {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showBalance ? `${data.saldoBCT.toLocaleString('pt-BR')} BCT` : '••••••'}
              </div>
              <p className="text-xs opacity-90 mt-1">
                ≈ {showBalance ? formatCurrency(data.saldoBCT * data.cotacao) : '••••••'}
              </p>
            </CardContent>
          </Card>

          {/* BRL Balance */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#0C3D2E]">
                Saldo BRL
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#12B76A]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0C3D2E]">
                {showBalance ? formatCurrency(data.saldoBRL) : '••••••'}
              </div>
              <p className="text-xs text-[#111827]/60 mt-1">
                Disponível para compras
              </p>
            </CardContent>
          </Card>

          {/* BCT Price */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#0C3D2E]">
                Cotação BCT
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0C3D2E]">
                {formatCurrency(data.cotacao)}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-green-600 font-medium">
                  +{data.variacao24h}%
                </span>
                <span className="text-xs text-[#111827]/60 ml-1">
                  últimas 24h
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link href="/comprar">
            <Button className="w-full bg-[#12B76A] hover:bg-[#0F9A5A] text-white py-6 text-lg font-medium">
              <ArrowDownLeft className="w-5 h-5 mr-2" />
              Comprar BCT
            </Button>
          </Link>
          <Link href="/vender">
            <Button 
              variant="outline" 
              className="w-full border-[#12B76A] text-[#12B76A] hover:bg-[#12B76A] hover:text-white py-6 text-lg font-medium"
            >
              <ArrowUpRight className="w-5 h-5 mr-2" />
              Vender BCT
            </Button>
          </Link>
          <Link href="/transacoes">
            <Button 
              variant="outline" 
              className="w-full border-[#111827]/20 text-[#111827] hover:bg-[#F3F4F6] py-6 text-lg font-medium"
            >
              <History className="w-5 h-5 mr-2" />
              Histórico
            </Button>
          </Link>
        </div>

        {/* Recent Transactions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#0C3D2E] flex items-center">
              <History className="w-5 h-5 mr-2" />
              Últimas Transações
            </CardTitle>
            <CardDescription>
              Suas transações mais recentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.ultimasTransacoes.map((transacao) => (
                <div
                  key={transacao.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-[#F3F4F6]/50 hover:bg-[#F3F4F6] transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(transacao.tipo)}
                    <div>
                      <p className="font-medium text-[#0C3D2E] capitalize">
                        {transacao.tipo}
                      </p>
                      <p className="text-sm text-[#111827]/60">
                        {formatDate(transacao.data)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#0C3D2E]">
                      {formatCurrency(transacao.valor)}
                    </p>
                    <Badge className={getStatusColor(transacao.status)}>
                      {transacao.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/transacoes">
                <Button variant="outline" className="border-[#12B76A] text-[#12B76A] hover:bg-[#12B76A] hover:text-white">
                  Ver Todas as Transações
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
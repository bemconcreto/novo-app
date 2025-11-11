import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface User {
  id: string
  nome: string
  email: string
  cpf: string
  wallet_address?: string
  saldo_bct: number
  created_at?: string
}

export interface Transaction {
  id: string
  user_id: string
  tipo: 'compra' | 'venda' | 'transferência'
  valor_brl: number
  quantidade_bct: number
  metodo_pagamento: 'PIX' | 'Cartão'
  status: 'pendente' | 'concluído' | 'falhou'
  data: string
  hash_transacao?: string
}

export interface Wallet {
  id: string
  user_id: string
  address: string
  private_key: string
}
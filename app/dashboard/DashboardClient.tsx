'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Wallet, TrendingUp, TrendingDown, Target } from 'lucide-react'
import Link from 'next/link'
import type { Account, Transaction, FinancialGoal } from '@/lib/types/database'
import { demoAccounts, demoTransactions, demoGoals } from '@/lib/demo-data'

export default function DashboardClient() {
  const [isDemoMode, setIsDemoMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('demoMode') === 'true'
    }
    return false
  })
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [goals, setGoals] = useState<FinancialGoal[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRealData = useCallback(async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    // Fetch accounts
    const { data: accountsData } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)

    setAccounts(accountsData || [])

    // Fetch recent transactions
    const { data: transactionsData } = await supabase
      .from('transactions')
      .select('*, account:accounts(name), category:categories(name, type)')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(5)

    setTransactions(transactionsData || [])

    // Fetch goals
    const { data: goalsData } = await supabase
      .from('financial_goals')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_completed', false)
      .limit(3)

    setGoals(goalsData || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isDemoMode) {
      // Use demo data
      setAccounts(demoAccounts as Account[])
      setTransactions(demoTransactions.slice(0, 5) as Transaction[])
      setGoals(demoGoals as FinancialGoal[])
      setLoading(false)
    } else {
      // Fetch real data
      fetchRealData()
    }
  }, [isDemoMode, fetchRealData])

  // Calculate stats
  const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0)

  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  
  const monthTransactions = isDemoMode 
    ? demoTransactions.filter(t => t.date >= firstDayOfMonth)
    : transactions

  const monthIncome = monthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0)
  const monthExpenses = monthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your financial health</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">This Month Income</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                ${monthIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">This Month Expenses</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                ${monthExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Net Income</p>
              <p className={`text-2xl font-bold mt-2 ${monthIncome - monthExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${(monthIncome - monthExpenses).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <Link href="/dashboard/transactions" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all
            </Link>
          </div>

          {transactions && transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((transaction: any) => {
                const accountName = isDemoMode
                  ? demoAccounts.find(a => a.id === transaction.account_id)?.name
                  : transaction.account?.name

                return (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description || 'No description'}</p>
                      <p className="text-sm text-gray-500">{accountName} • {new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${Number(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No transactions yet</p>
          )}
        </div>

        {/* Financial Goals */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Financial Goals</h2>
            <Link href="/dashboard/goals" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all
            </Link>
          </div>

          {goals && goals.length > 0 ? (
            <div className="space-y-4">
              {goals.map((goal: any) => {
                const progress = (Number(goal.current_amount) / Number(goal.target_amount)) * 100
                return (
                  <div key={goal.id}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{goal.name}</p>
                      <p className="text-sm text-gray-600">{progress.toFixed(0)}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      ${Number(goal.current_amount).toFixed(2)} of ${Number(goal.target_amount).toFixed(2)}
                    </p>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No goals set yet</p>
          )}
        </div>
      </div>
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Trash2, Building2 } from 'lucide-react'
import type { Account } from '@/lib/types/database'
import { demoAccounts } from '@/lib/demo-data'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    name: '',
    type: 'checking' as Account['type'],
    bank_name: '',
    balance: '0',
    currency: 'USD',
  })

  useEffect(() => {
    const demoMode = localStorage.getItem('demoMode') === 'true'
    setIsDemoMode(demoMode)

    if (demoMode) {
      setAccounts(demoAccounts)
      setLoading(false)
    } else {
      fetchAccounts()
    }
  }, [])

  const fetchAccounts = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setAccounts(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isDemoMode) {
      alert('Demo mode: Changes are not saved. Sign up to save your data!')
      closeModal()
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const accountData = {
      ...formData,
      balance: parseFloat(formData.balance),
      user_id: user.id,
    }

    if (editingAccount) {
      const { error } = await supabase
        .from('accounts')
        .update(accountData)
        .eq('id', editingAccount.id)

      if (!error) {
        fetchAccounts()
        closeModal()
      }
    } else {
      const { error } = await supabase
        .from('accounts')
        .insert([accountData])

      if (!error) {
        fetchAccounts()
        closeModal()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this account?')) return

    if (isDemoMode) {
      alert('Demo mode: Changes are not saved. Sign up to save your data!')
      return
    }

    const { error } = await supabase
      .from('accounts')
      .delete()
      .eq('id', id)

    if (!error) {
      fetchAccounts()
    }
  }

  const openModal = (account?: Account) => {
    if (account) {
      setEditingAccount(account)
      setFormData({
        name: account.name,
        type: account.type,
        bank_name: account.bank_name || '',
        balance: account.balance.toString(),
        currency: account.currency,
      })
    } else {
      setEditingAccount(null)
      setFormData({
        name: '',
        type: 'checking',
        bank_name: '',
        balance: '0',
        currency: 'USD',
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingAccount(null)
  }

  const getAccountIcon = (type: string) => {
    const icons: Record<string, string> = {
      checking: '🏦',
      savings: '💰',
      credit_card: '💳',
      cash: '💵',
      investment: '📈',
      loan: '🏠',
    }
    return icons[type] || '💼'
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
          <p className="text-gray-600 mt-1">Manage your bank accounts and balances</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Account
        </button>
      </div>

      {accounts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No accounts yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first account</p>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Add Your First Account
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getAccountIcon(account.type)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{account.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{account.type.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>
              
              {account.bank_name && (
                <p className="text-sm text-gray-600 mb-3">🏛️ {account.bank_name}</p>
              )}
              
              <div className="mb-4">
                <p className="text-2xl font-bold text-gray-900">
                  ${Number(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500">{account.currency}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openModal(account)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(account.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingAccount ? 'Edit Account' : 'Add New Account'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., Chase Checking"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Account['type'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="cash">Cash</option>
                  <option value="investment">Investment</option>
                  <option value="loan">Loan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name (Optional)</label>
                <input
                  type="text"
                  value={formData.bank_name}
                  onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., Chase, Bank of America"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Balance</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="0.00"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  {editingAccount ? 'Update' : 'Add'} Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { PieChart, Plus, TrendingDown, AlertCircle } from 'lucide-react'

// Demo budget data
const demoBudgets = [
  {
    id: 'budget-1',
    category: 'Groceries',
    category_icon: '🛒',
    category_color: '#ef4444',
    amount: 500,
    spent: 325.50,
    period: 'monthly',
  },
  {
    id: 'budget-2',
    category: 'Dining Out',
    category_icon: '🍽️',
    category_color: '#f97316',
    amount: 300,
    spent: 285.00,
    period: 'monthly',
  },
  {
    id: 'budget-3',
    category: 'Transportation',
    category_icon: '🚗',
    category_color: '#3b82f6',
    amount: 200,
    spent: 145.00,
    period: 'monthly',
  },
  {
    id: 'budget-4',
    category: 'Entertainment',
    category_icon: '🎬',
    category_color: '#8b5cf6',
    amount: 150,
    spent: 95.00,
    period: 'monthly',
  },
  {
    id: 'budget-5',
    category: 'Shopping',
    category_icon: '🛍️',
    category_color: '#a855f7',
    amount: 250,
    spent: 250.00,
    period: 'monthly',
  },
]

export default function BudgetsPage() {
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [budgets, setBudgets] = useState<any[]>([])

  useEffect(() => {
    const demoMode = localStorage.getItem('demoMode') === 'true'
    setIsDemoMode(demoMode)
    
    if (demoMode) {
      setBudgets(demoBudgets)
    } else {
      // In real mode, would fetch from Supabase
      setBudgets([])
    }
  }, [])

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)

  const handleAddBudget = () => {
    if (isDemoMode) {
      alert('Demo mode: Changes are not saved. Sign up to save your data!')
    } else {
      // Would open modal to add budget
      alert('Budget creation coming soon!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
          <p className="text-gray-600 mt-1">Track your spending limits</p>
        </div>
        <button
          onClick={handleAddBudget}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Budget
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ${totalBudget.toFixed(2)}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <PieChart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                ${totalSpent.toFixed(2)}
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
              <p className="text-sm text-gray-600 font-medium">Remaining</p>
              <p className={`text-2xl font-bold mt-2 ${totalBudget - totalSpent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${(totalBudget - totalSpent).toFixed(2)}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Budgets List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Budgets</h2>
          
          {budgets.length > 0 ? (
            <div className="space-y-4">
              {budgets.map((budget) => {
                const percentage = (budget.spent / budget.amount) * 100
                const isOverBudget = percentage > 100

                return (
                  <div key={budget.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{budget.category_icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{budget.category}</h3>
                          <p className="text-sm text-gray-500 capitalize">{budget.period}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          ${budget.spent.toFixed(2)} of ${budget.amount.toFixed(2)}
                        </p>
                        <p className={`text-sm font-semibold ${isOverBudget ? 'text-red-600' : 'text-gray-700'}`}>
                          {percentage.toFixed(0)}% used
                        </p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>

                    {isOverBudget && (
                      <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Over budget by ${(budget.spent - budget.amount).toFixed(2)}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <PieChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No budgets set yet</p>
              <button
                onClick={handleAddBudget}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Create your first budget
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


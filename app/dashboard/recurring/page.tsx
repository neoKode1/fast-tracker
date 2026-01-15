'use client'

import { Receipt, Plus } from 'lucide-react'

export default function RecurringPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recurring Transactions</h1>
          <p className="text-gray-600 mt-1">Manage subscriptions and recurring bills</p>
        </div>
        <button
          disabled
          className="flex items-center gap-2 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Add Recurring
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
        <Receipt className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Recurring transactions feature is under development. Soon you'll be able to automate your regular income and expenses.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-lg mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Planned Features:</strong>
          </p>
          <ul className="text-sm text-blue-700 mt-2 space-y-1 text-left">
            <li>• Set up recurring income (salary, freelance)</li>
            <li>• Track subscriptions (Netflix, Spotify, etc.)</li>
            <li>• Automate bill payments</li>
            <li>• Get reminders for upcoming payments</li>
            <li>• View next occurrence dates</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


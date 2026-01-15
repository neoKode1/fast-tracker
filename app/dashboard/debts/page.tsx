'use client'

import { CreditCard, Plus } from 'lucide-react'

export default function DebtsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Debt Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor loans and credit cards</p>
        </div>
        <button
          disabled
          className="flex items-center gap-2 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Add Debt
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
        <CreditCard className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Debt tracking feature is under development. Soon you'll be able to track credit cards, loans, and payment schedules.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-lg mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Planned Features:</strong>
          </p>
          <ul className="text-sm text-blue-700 mt-2 space-y-1 text-left">
            <li>• Track multiple debts (credit cards, loans, mortgages)</li>
            <li>• Monitor interest rates and payment schedules</li>
            <li>• Calculate payoff timelines</li>
            <li>• Visualize debt reduction progress</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


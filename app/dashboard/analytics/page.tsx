'use client'

import { TrendingUp, BarChart3, PieChart, LineChart } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Visualize your financial data</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
        <TrendingUp className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Analytics and charts feature is under development. Soon you'll have beautiful visualizations of your financial data.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-lg mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Planned Features:</strong>
          </p>
          <ul className="text-sm text-blue-700 mt-2 space-y-1 text-left">
            <li>• Income vs Expenses charts</li>
            <li>• Spending by category (pie charts)</li>
            <li>• Trends over time (line graphs)</li>
            <li>• Location-based spending analysis</li>
            <li>• Monthly comparison reports</li>
            <li>• Custom date range filtering</li>
          </ul>
        </div>

        {/* Preview of chart types */}
        <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto">
          <div className="bg-gray-50 p-4 rounded-lg">
            <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Bar Charts</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <PieChart className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Pie Charts</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <LineChart className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Line Graphs</p>
          </div>
        </div>
      </div>
    </div>
  )
}


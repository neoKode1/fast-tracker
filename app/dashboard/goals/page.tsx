'use client'

import { useEffect, useState } from 'react'
import { Target, Plus, TrendingUp, Calendar } from 'lucide-react'
import { demoGoals } from '@/lib/demo-data'

export default function GoalsPage() {
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [goals, setGoals] = useState<any[]>([])

  useEffect(() => {
    const demoMode = localStorage.getItem('demoMode') === 'true'
    setIsDemoMode(demoMode)
    
    if (demoMode) {
      setGoals(demoGoals)
    } else {
      // In real mode, would fetch from Supabase
      setGoals([])
    }
  }, [])

  const handleAddGoal = () => {
    if (isDemoMode) {
      alert('Demo mode: Changes are not saved. Sign up to save your data!')
    } else {
      alert('Goal creation coming soon!')
    }
  }

  const totalTarget = goals.reduce((sum, g) => sum + Number(g.target_amount), 0)
  const totalSaved = goals.reduce((sum, g) => sum + Number(g.current_amount), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600 mt-1">Track your savings goals</p>
        </div>
        <button
          onClick={handleAddGoal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Goal
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Target</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ${totalTarget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Saved</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                ${totalSaved.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
              <p className="text-sm text-gray-600 font-medium">Remaining</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                ${(totalTarget - totalSaved).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.length > 0 ? (
          goals.map((goal) => {
            const progress = (Number(goal.current_amount) / Number(goal.target_amount)) * 100
            const daysUntilTarget = Math.ceil(
              (new Date(goal.target_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            )
            
            return (
              <div key={goal.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                    {goal.description && (
                      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    )}
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">{progress.toFixed(0)}%</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Current</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${Number(goal.current_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Target</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${Number(goal.target_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Target Date</span>
                      <span className="font-medium text-gray-900">
                        {new Date(goal.target_date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {daysUntilTarget > 0 ? `${daysUntilTarget} days remaining` : 'Target date passed'}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-2 bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No financial goals set yet</p>
            <button
              onClick={handleAddGoal}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create your first goal
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


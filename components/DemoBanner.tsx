'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Info } from 'lucide-react'

export default function DemoBanner() {
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setIsDemoMode(localStorage.getItem('demoMode') === 'true')
  }, [])

  const exitDemoMode = () => {
    localStorage.removeItem('demoMode')
    router.push('/login')
  }

  if (!isDemoMode || !showBanner) return null

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5" />
          <div>
            <p className="font-semibold">Demo Mode Active</p>
            <p className="text-sm text-purple-100">
              You're viewing sample data. Changes won't be saved.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exitDemoMode}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition text-sm"
          >
            Exit Demo & Sign Up
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="text-white hover:text-purple-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}


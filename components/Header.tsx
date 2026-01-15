'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { demoUser } from '@/lib/demo-data'
import DemoBanner from './DemoBanner'

export default function Header({ user }: { user: SupabaseUser | null }) {
  const router = useRouter()
  const supabase = createClient()
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    setIsDemoMode(localStorage.getItem('demoMode') === 'true')
  }, [])

  const handleLogout = async () => {
    if (isDemoMode) {
      localStorage.removeItem('demoMode')
      router.push('/login')
    } else {
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh()
    }
  }

  const displayUser = isDemoMode ? demoUser : user
  const displayEmail = displayUser?.email || 'Guest'

  return (
    <>
      <DemoBanner />
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome back{isDemoMode ? ' to Demo Mode' : ''}!
            </h2>
            <p className="text-sm text-gray-600">{displayEmail}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{displayEmail}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">{isDemoMode ? 'Exit Demo' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}


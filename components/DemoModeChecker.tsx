'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export default function DemoModeChecker({ user }: { user: User | null }) {
  const router = useRouter()

  useEffect(() => {
    const isDemoMode = localStorage.getItem('demoMode') === 'true'
    console.log('DemoModeChecker - isDemoMode:', isDemoMode, 'user:', user)

    // If not in demo mode and no user, redirect to login
    if (!isDemoMode && !user) {
      console.log('No demo mode and no user, redirecting to login')
      router.push('/login')
    } else {
      console.log('Access granted - demo mode or user exists')
    }
  }, [user, router])

  return null
}


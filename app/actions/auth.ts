'use client'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return { handleSignOut }
}
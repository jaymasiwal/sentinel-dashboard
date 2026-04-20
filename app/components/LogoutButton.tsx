'use client'
import { useAuth } from '@/app/actions/auth'

export default function LogoutButton() {
  const { handleSignOut } = useAuth()
  return (
    <button 
      onClick={handleSignOut}
      className="px-4 py-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 rounded-xl hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all"
    >
      Logout
    </button>
  )
}
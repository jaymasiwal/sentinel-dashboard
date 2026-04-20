'use client'
import { useAuth } from '@/app/actions/auth'
import { useState } from 'react'

export default function LogoutButton() {
  const { handleSignOut } = useAuth()
  const [showConfirm, setShowConfirm] = useState(false)

  // THE CONFIRMATION STATE (YES / NO)
  if (showConfirm) {
    return (
      <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
        <span className="text-xs font-medium text-slate-500 mr-1">Log out?</span>
        <button 
          onClick={handleSignOut}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-500 border border-rose-600 rounded-lg shadow-sm hover:bg-rose-600 active:scale-95 transition-all"
        >
          Yes
        </button>
        <button 
          onClick={() => setShowConfirm(false)}
          className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white/60 border border-slate-200 rounded-lg shadow-sm hover:bg-white hover:text-slate-900 active:scale-95 transition-all"
        >
          No
        </button>
      </div>
    )
  }

  // THE DEFAULT STATE (Hover turns to beautiful red)
  return (
    <button 
      onClick={() => setShowConfirm(true)}
      className="px-4 py-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 rounded-xl transition-all duration-300 hover:bg-rose-500 hover:text-white hover:border-rose-600 hover:shadow-md active:scale-95"
    >
      Logout
    </button>
  )
}
'use client'
import { sendPasswordResetEmail } from '@/app/actions/auth'
import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPassword() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle')

  const handleReset = async (formData: FormData) => {
    setStatus('loading')
    try {
      await sendPasswordResetEmail(formData)
      setStatus('sent')
    } catch (error) {
      console.error(error)
      setStatus('idle')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-100/40 blur-3xl -z-10"></div>
      
      <div className="glass-card p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Reset Password</h2>
        <p className="text-slate-500 text-sm mb-6">Enter your email and we'll send a secure reset link.</p>
        
        {status === 'sent' ? (
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl text-sm border border-emerald-100 mb-6">
            Check your email. A secure link has been sent.
          </div>
        ) : (
          <form action={handleReset} className="flex flex-col gap-4">
            <input 
              name="email" 
              type="email" 
              placeholder="name@example.com" 
              required 
              className="glass-input w-full"
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="glass-button w-full justify-center"
            >
              {status === 'loading' ? 'Transmitting...' : 'Send Reset Link'}
            </button>
          </form>
        )}
        
        <div className="mt-6 text-center text-xs">
          <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
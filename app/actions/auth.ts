'use client'
import { createClient } from '@/utils/supabase/client'
import { create } from 'domain'
import { redirect, useRouter } from 'next/navigation'

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

export async function sendPasswordResetEmail(formData: FormData){
  const supabase = await createClient()
  const email = formData.get('email') as string 

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sentinel-dashboard-red-xi.vercel.app'

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/update-password`,
  })

  if (error) throw new Error(error.message)
}

export async function updatePassword(formData: FormData){
  const supabase = await createClient()
  const password = formData.get('password') as string 

  const { error } = await supabase.auth.updateUser({ password })

  if(error) throw new Error(error.message)
  
  redirect('/')
}
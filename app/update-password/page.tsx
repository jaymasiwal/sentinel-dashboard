import { updatePassword } from '@/app/actions/auth'

export default function UpdatePassword() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-100/40 blur-3xl -z-10"></div>
      
      <div className="glass-card p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Secure New Password</h2>
        <p className="text-slate-500 text-sm mb-6">Enter a strong password to re-secure your account.</p>
        
        <form action={updatePassword} className="flex flex-col gap-4">
          <input 
            name="password" 
            type="password" 
            placeholder="New Password" 
            required 
            minLength={6}
            className="glass-input w-full"
          />
          <button type="submit" className="glass-button w-full justify-center text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300">
            Confirm Identity
          </button>
        </form>
      </div>
    </div>
  )
}
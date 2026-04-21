import { login, signup } from '@/app/login/actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <form className="flex flex-col gap-4 w-full max-w-sm p-8 border border-zinc-800 rounded-lg bg-zinc-900/50">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tighter">Sentinel Access</h1>
          <p className="text-zinc-500 text-sm">Enter credentials to bypass the perimeter.</p>
        </div>
        <input id="email" name="email" type="email" placeholder="Email" required className="p-2 bg-zinc-800 rounded border border-zinc-700 outline-none focus:ring-1 focus:ring-white" />
        <div className="flex justify-end mt-2 mb-4">
  <Link href="/forgot-password" className="text-xs text-neutral-400 hover:text-white transition-colors">
    Forgot password?
  </Link>
</div>
        <button formAction={login} className="bg-white text-black p-2 rounded font-bold hover:bg-zinc-200 transition">Log In</button>
        <button formAction={signup} className="text-zinc-400 text-sm hover:text-white transition">Sign Up</button>
      </form>
    </div>
  )
}
import { login, signup } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-sm p-8 rounded-xl border border-neutral-800 bg-neutral-900/50">
        <h1 className="text-3xl font-bold mb-2">Sentinel Access</h1>
        <p className="text-neutral-500 text-sm mb-8">Enter credentials to bypass the perimeter.</p>

        <form className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
          />
          
          <div className="flex flex-col gap-2">
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              minLength={6}
              className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            />
            <div className="text-right">
              <Link href="/forgot-password" className="text-xs text-neutral-500 hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            formAction={login}
            className="w-full py-3 mt-2 font-bold text-black bg-white rounded-lg hover:bg-neutral-200 active:scale-95 transition-all"
          >
            Log In
          </button>
          
          <button
            formAction={signup}
            className="w-full py-2 mt-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
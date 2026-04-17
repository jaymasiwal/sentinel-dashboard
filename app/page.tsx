import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Index(){
  const supabase = await createClient()

  const{
    data: {user},
  } = await supabase.auth.getUser()

  //// Guard: No session = No access
  if(!user){
    return redirect('/login')
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white p-8 font-sans">
      <nav className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-4">
        <h1 className="text-xl font-bold tracking-tighter uppercase">Sentinel_System_v1</h1>
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-sm font-mono">{user.email}</span>
          <form action="/auth/signout" method="post">
            <button className="text-xs bg-zinc-800 hover:bg-red-900/40 px-3 py-1 rounded border border-zinc-700 transition">
              TERMINATE_SESSION
            </button>
          </form>
        </div>
      </nav>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/30">
          <p className="text-zinc-500 text-xs uppercase tracking-widest">Auth Status</p>
          <p className="text-2xl font-mono mt-2 text-green-500">ENCRYPTED</p>
        </div>
        <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/30">
          <p className="text-zinc-500 text-xs uppercase tracking-widest">Node Version</p>
          <p className="text-2xl font-mono mt-2 text-blue-400">v20.18.1</p>
        </div>
        <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/30">
          <p className="text-zinc-500 text-xs uppercase tracking-widest">Pipeline Deadline</p>
          <p className="text-2xl font-mono mt-2 text-yellow-500">AUG_22_2026</p>
        </div>
      </main>
    </div>
  )
}
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addTask } from '@/app/actions/tasks'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <nav className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold tracking-tighter uppercase text-white">Sentinel_System_v1</h1>
        </div>
        <div className="flex items-center gap-4 text-zinc-500 text-sm font-mono">
          <span>{user.email}</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto w-full space-y-10">
        {/* THE UPLINK FORM */}
        <section className="p-4 border border-zinc-800 rounded-lg bg-zinc-900/20 shadow-2xl">
          <form action={addTask} className="flex flex-col md:flex-row gap-4">
            <input 
              name="title" 
              placeholder="ENTER_NEW_OBJECTIVE..." 
              required 
              className="flex-1 bg-transparent border-b border-zinc-700 focus:border-blue-500 outline-none font-mono text-sm py-2 transition-all"
            />
            <div className="flex gap-4">
              <select name="category" className="bg-zinc-900 border border-zinc-700 text-[10px] font-mono p-2 outline-none rounded">
                <option value="GSOC">GSOC</option>
                <option value="UPSC">UPSC</option>
                <option value="SENTINEL">SENTINEL</option>
              </select>
              <button type="submit" className="bg-white text-black text-[10px] font-bold px-6 py-2 rounded hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest">
                Deploy
              </button>
            </div>
          </form>
        </section>

        {/* TASK LOGS */}
        <section className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/10">
          <table className="w-full text-left text-sm font-mono">
            <thead>
              <tr className="text-zinc-600 border-b border-zinc-800 text-[10px]">
                <th className="p-4">OBJECTIVE</th>
                <th className="p-4">SECTOR</th>
                <th className="p-4">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task) => (
                <tr key={task.id} className="border-b border-zinc-900/50 hover:bg-zinc-800/20 transition">
                  <td className="p-4 text-zinc-300">{task.title}</td>
                  <td className="p-4 text-zinc-500 text-xs">{task.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-[2px] text-[10px] border ${
                      task.status === 'COMPLETED' ? 'bg-green-900/20 text-green-500 border-green-900/50' : 
                      task.status === 'IN_PROGRESS' ? 'bg-blue-900/20 text-blue-400 border-blue-900/50' :
                      'bg-zinc-800 text-zinc-500 border-zinc-700'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  )
}
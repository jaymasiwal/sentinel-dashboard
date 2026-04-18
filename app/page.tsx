import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addTask } from '@/app/actions/tasks'
import TaskRow from '@/app/components/TaskRow'
import FilterTabs from '@/app/components/FilterTabs' // 1. IMPORT TABS

// 2. UPDATED FUNCTION SIGNATURE: Added searchParams to the page
export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ sector?: string }>
}) {
  // 3. RESOLVE PARAMS: Get the active sector from the URL
  const resolvedParams = await searchParams
  const activeSector = resolvedParams?.sector || 'ALL'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  // 4. DYNAMIC QUERY: Filter database based on the URL parameter
  let query = supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (activeSector !== 'ALL') {
    query = query.eq('category', activeSector)
  }

  const { data: tasks } = await query

  // ==========================================
  // ANALYTICS ENGINE (Now acts on filtered data)
  // ==========================================
  const totalTasks = tasks?.length || 0
  const completedTasks = tasks?.filter((t) => t.status === 'COMPLETED').length || 0
  const successRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  let topSector = 'N/A'
  if (tasks && tasks.length > 0) {
    const counts = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    topSector = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))
  }

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
            <input name="title" placeholder="ENTER_NEW_OBJECTIVE..." required className="flex-1 bg-transparent border-b border-zinc-700 focus:border-blue-500 outline-none font-mono text-sm py-2 transition-all"/>
            <div className="flex gap-4">
              <select name="category" className="bg-zinc-900 border border-zinc-700 text-[10px] font-mono p-2 outline-none rounded text-white">
                <option value="GSOC">GSOC</option>
                <option value="UPSC">UPSC</option>
                <option value="SENTINEL">SENTINEL</option>
              </select>
              <button type="submit" className="bg-white text-black text-[10px] font-bold px-6 py-2 rounded hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest">Deploy</button>
            </div>
          </form>
        </section>

        {/* DYNAMIC METRICS BOXES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-center">
          <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/30">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
              {activeSector === 'ALL' ? 'Total' : activeSector} Active_Modules
            </p>
            <p className="text-3xl mt-2 text-blue-500">{totalTasks}</p>
          </div>
          <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/30">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Efficiency_Rating</p>
            <p className="text-3xl mt-2 text-green-500">{successRate}%</p>
          </div>
          <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/30">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Target_Sector</p>
            <p className="text-3xl mt-2 text-yellow-500 uppercase">
              {activeSector !== 'ALL' ? activeSector : topSector}
            </p>
          </div>
        </section>

        {/* TASK LOGS */}
        <section className="space-y-4">
          {/* 5. ADDED TABS: Placed here for UX */}
          <FilterTabs /> 

          <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/10">
            <table className="w-full text-left text-sm font-mono">
              <thead>
                <tr className="text-zinc-600 border-b border-zinc-800 text-[10px]">
                  <th className="p-4 w-1/2">OBJECTIVE</th>
                  <th className="p-4 w-1/6">SECTOR</th>
                  <th className="p-4 w-1/6">STATUS</th>
                  <th className="p-4 w-1/6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addTask } from '@/app/actions/tasks'
import TaskRow from '@/app/components/TaskRow'
import FilterTabs from '@/app/components/FilterTabs'
import RealtimeTasks from '@/app/components/RealtimeTasks' 
import LogoutButton from '@/app/components/LogoutButton'

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ sector?: string }>
}) {
  const resolvedParams = await searchParams
  const activeSector = resolvedParams?.sector || 'ALL'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  // Fetch ALL tasks to generate dynamic tabs and metrics
  const { data: allTasks } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  // Extract unique categories (e.g., automatically finds "CIVIL SERVICE EXAM 27")
  const uniqueCategories = Array.from(new Set(allTasks?.map(t => t.category) || []))

  // Filter the table view based on the clicked tab
  const displayTasks = activeSector === 'ALL' 
    ? allTasks 
    : allTasks?.filter(t => t.category === activeSector)

  const totalTasks = allTasks?.length || 0
  const completedTasks = allTasks?.filter((t) => t.status === 'COMPLETED').length || 0
  const successRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  let topSector = 'None'
  if (allTasks && allTasks.length > 0) {
    const counts = allTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    topSector = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))
  }

  return (
    <div className="flex flex-col min-h-screen p-6 md:p-12 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-100/40 blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-100/40 blur-3xl -z-10"></div>

      <RealtimeTasks />

      <nav className="flex justify-between items-center mb-12 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-800">Workspace</h1>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <span className="text-slate-500">{user.email}</span>
          <LogoutButton />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto w-full space-y-8">
        
        <section className="glass-card p-6">
          <form action={addTask} className="flex flex-col md:flex-row gap-4 items-center w-full">
            <input 
              name="title" 
              placeholder="What is the objective?" 
              required 
              className="glass-input w-full md:w-3/5"
            />
            <input 
              name="category" 
              placeholder="Tag (e.g., UPSC, GSOC)" 
              required 
              className="glass-input w-full md:w-1/5 uppercase"
            />
            <button type="submit" className="glass-button w-full md:w-1/5">
              Deploy
            </button>
          </form>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Modules</p>
            <p className="text-4xl font-light text-slate-800">{totalTasks}</p>
          </div>
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Completion Rate</p>
            <p className="text-4xl font-light text-emerald-500">{successRate}%</p>
          </div>
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Primary Focus</p>
            <p className="text-2xl font-light text-blue-500 truncate max-w-[150px]">{topSector}</p>
          </div>
        </section>

        <section className="space-y-4">
          {/* We now pass the live categories down to the tabs */}
          <FilterTabs categories={uniqueCategories} /> 

          <div className="glass-card overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-5 font-medium">Objective</th>
                  <th className="p-5 font-medium">Tag</th>
                  <th className="p-5 font-medium">Status</th>
                  <th className="p-5 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 text-slate-600">
                {displayTasks?.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </tbody>
            </table>
            {displayTasks?.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                Your workspace is empty. Add an objective to begin.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
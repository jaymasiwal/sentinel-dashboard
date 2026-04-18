'use client'

import { useState } from 'react'
import { toggleTaskStatus, deleteTask, updateTask } from '@/app/actions/tasks'

export default function TaskRow({ task }: { task: any }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editCategory, setEditCategory] = useState(task.category)

  const handleSave = async () => {
    await updateTask(task.id, editTitle, editCategory)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <tr className="border-b border-zinc-800 bg-zinc-900/40">
        <td className="p-2">
          <input 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-black border border-zinc-700 text-zinc-300 font-mono text-sm p-2 outline-none focus:border-blue-500"
          />
        </td>
        <td className="p-2">
          <select 
            value={editCategory} 
            onChange={(e) => setEditCategory(e.target.value)}
            className="w-full bg-black border border-zinc-700 text-zinc-500 font-mono text-xs p-2 outline-none focus:border-blue-500"
          >
            <option value="GSOC">GSOC</option>
            <option value="UPSC">UPSC</option>
            <option value="SENTINEL">SENTINEL</option>
          </select>
        </td>
        <td className="p-2 text-zinc-600 text-[10px]">EDIT_MODE_ENGAGED</td>
        <td className="p-2 text-right space-x-2">
          <button onClick={handleSave} className="text-green-500 hover:text-green-400 font-mono text-xs">[SAVE]</button>
          <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white font-mono text-xs">[CANCEL]</button>
        </td>
      </tr>
    )
  }

  // Normal Read-Only View
  return (
    <tr className="border-b border-zinc-900/50 hover:bg-zinc-800/20 transition">
      <td className="p-4 text-zinc-300">{task.title}</td>
      <td className="p-4 text-zinc-500 text-xs">{task.category}</td>
      <td className="p-4">
        <form action={async () => await toggleTaskStatus(task.id, task.status)}>
          <button 
  type="submit" 
  className={`px-2 py-1 rounded-[2px] text-[10px] border transition-all cursor-pointer font-mono ${
    task.status === 'COMPLETED' ? 'bg-green-900/20 text-green-500 border-green-900/50' : 
    task.status === 'IN_PROGRESS' ? 'bg-blue-900/20 text-blue-400 border-blue-900/50' :
    'bg-zinc-800 text-zinc-400 border-zinc-700'
  }`}
>
  {task.status}
</button>
        </form>
      </td>
      <td className="p-4 text-right space-x-3">
        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-400 font-mono text-xs">[EDIT]</button>
        <form className="inline" action={async () => await deleteTask(task.id)}>
          <button type="submit" className="text-zinc-700 hover:text-red-500 transition-colors text-xs font-mono">[DEL]</button>
        </form>
      </td>
    </tr>
  )
}
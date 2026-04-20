'use client'
import { useState } from 'react'
import { toggleTaskStatus, deleteTask, updateTask } from '@/app/actions/tasks'

export default function TaskRow({ task }: { task: any }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editCategory, setEditCategory] = useState(task.category)

  const handleSave = () => {
    updateTask(task.id, editTitle, editCategory.toUpperCase())
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <tr className="bg-white/40">
        <td className="p-4">
          <input 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            autoFocus
          />
        </td>
        <td className="p-4">
          <input 
            value={editCategory} 
            onChange={(e) => setEditCategory(e.target.value)} 
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </td>
        <td className="p-4 text-xs font-medium text-slate-400">Editing...</td>
        <td className="p-4 text-right space-x-3">
          <button onClick={handleSave} className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">Save</button>
          <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors">Cancel</button>
        </td>
      </tr>
    )
  }

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className={`p-4 font-medium transition-all ${task.status === 'COMPLETED' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
        {task.title}
      </td>
      <td className="p-4">
        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wider rounded-md">
          {task.category}
        </span>
      </td>
      <td className="p-4 cursor-pointer" onClick={() => toggleTaskStatus(task.id, task.status)}>
        <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full transition-all ${
          task.status === 'COMPLETED' 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-amber-100 text-amber-700'
        }`}>
          {task.status}
        </span>
      </td>
      <td className="p-4 text-right space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 text-xs font-semibold uppercase tracking-wide">Edit</button>
        <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-600 text-xs font-semibold uppercase tracking-wide">Drop</button>
      </td>
    </tr>
  )
}
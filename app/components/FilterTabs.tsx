'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function FilterTabs() {
  const searchParams = useSearchParams()
  const activeSector = searchParams.get('sector') || 'ALL'
  
  // Clean, generic tabs for the new UI. 
  const tabs = ['ALL', 'WORK', 'FITNESS', 'SYSTEM'] 

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <Link
          key={tab}
          href={tab === 'ALL' ? '/' : `/?sector=${tab}`}
          className={`px-5 py-2 rounded-2xl text-xs font-semibold tracking-wide transition-all ${
            activeSector === tab
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
              : 'bg-white/60 text-slate-500 hover:bg-white border border-slate-200 shadow-sm'
          }`}
        >
          {tab}
        </Link>
      ))}
    </div>
  )
}
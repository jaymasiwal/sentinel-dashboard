'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function FilterTabs(){
    const router = useRouter()
    const searchParams = useSearchParams()

    //Read the current URL, default to "ALL" if no parameter exists
    const currentSector = searchParams.get('sector') || 'ALL' 

    const sectors = ['ALL', 'GSOC', 'UPSC', 'SENTINEL']

    const handleFilter = (sector: string) => {
        if(sector === 'ALL'){
            router.push('/') // Clears the URL
        } else {
            router.push(`/?sector=${sector}`) // Updates the URL 
        }
    }

    return(
        <div className="flex gap-2 mb-6">
      {sectors.map(sector => (
        <button
          key={sector}
          onClick={() => handleFilter(sector)}
          className={`text-[10px] font-mono px-4 py-2 rounded-[2px] transition-all uppercase tracking-widest ${
            currentSector === sector
              ? 'bg-zinc-100 text-black font-bold shadow-[0_0_10px_rgba(255,255,255,0.2)]'
              : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-300'
          }`}
        >
          {sector}
        </button>
      ))}
    </div>
    )
}
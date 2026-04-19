'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

export default function RealTimeTasks(){
    const router = useRouter()
    const supabase = createClient()

    useEffect(()=>{
        const channel = supabase
        .channel('realtime-tasks')
        .on(
            'postgres_changes',
            {event: '*', schema: 'public', table: 'tasks' },
            ()=>{
               // 2. When a change is detected, silently refresh the server data
               router.refresh() 
            }
        )
        .subscribe()
// 3. Cleanup the connection if the component unmounts
        return ()=>{
            supabase.removeChannel(channel)
        }        
    }, [supabase, router])
    // This compenent is invisible, it just runs logic
    return null
}


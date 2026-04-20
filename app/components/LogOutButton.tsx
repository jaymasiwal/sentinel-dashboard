'use client'
import { useAuth } from "@/app/actions/auth"

export default function LogOutButton(){
    const { handleSignOut } = useAuth()
    return (
        <button
        onClick={handleSignOut}
        className="text-[10px] border border-red-900/50 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-all uppercase font-mono"
        >
         Terminate_Session
        </button>
    )
}
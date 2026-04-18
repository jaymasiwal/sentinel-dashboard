'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function addTask(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const category = formData.get('category') as string

    //Logic: Insert a new tasks linked to logged-in user
    const { error } = await supabase
        .from('tasks')
        .insert([{ title, category, status: 'PENDING'}])

        if(error){
            console.error('ERROR_UPLINK_FAILED', error.message)
            throw new Error('Failed to deploy the objective')
        }

    // it tells Next.js to refresh the data on the page
    revalidatePath('/')
}

export async function toggleTaskStatus(id: string, currentStatus: string) {
  const supabase = await createClient()
  
  const nextStatus = currentStatus === 'PENDING' ? 'COMPLETED' : 'PENDING'

  const { error } = await supabase
    .from('tasks')
    .update({ status: nextStatus })
    .eq('id', id)

  if (error) {
    console.error('ERROR_STATUS_UPDATE:', error.message)
    return
  }

  revalidatePath('/')
}

export async  function deleteTask(id: string){
    const supabase = await createClient()
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if(error) throw new Error(error.message)
        revalidatePath('/')
}

export async function updateTask(id: string, title: string, category: string){
    const supabase = await createClient()
    const{ error } = await supabase.from('tasks').update({ title, category }).eq('id', id)
    if(error) throw new Error(error.message)
        revalidatePath('/')
}

export async function toggletaskStatus(id: string, currentStatus: string){
    const supabase = await createClient()

    //Defined rotation: Pending -> In Progress -> Completed -> back to Pending
    const statusRotation: Record<string, string> = {
        'PENDING': 'IN_PROGRESS',
        'IN_PROGRESS': 'COMPLETED',
        'COMPLETED': 'PENDING'
    }

    const nextStatus = statusRotation[currentStatus] || 'PENDING'
    const { error } = await supabase
        .from('tasks')
        .update({ status : nextStatus })
        .eq('is', id)

    if(error) throw new Error(error.message)
        revalidatePath('/')
}
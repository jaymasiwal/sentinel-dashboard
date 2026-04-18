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
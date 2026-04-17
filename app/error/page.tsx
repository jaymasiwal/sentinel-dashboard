export default function errorPage(){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold text-red-500 font-mono border border-red-500 p-2">AUTH_FAILURE</h1>
      <p className="text-zinc-500 mt-4">The database rejected your credentials.</p>
      <ul className="text-zinc-400 mt-2 text-sm list-disc list-inside">
        <li>Did you click "Log In" for an account that doesn't exist yet?</li>
        <li>Is your password at least 6 characters? (Supabase default)</li>
        <li>Did you enter the wrong password?</li>
      </ul>
      <a href="/login" className="mt-8 px-4 py-2 bg-white text-black font-bold rounded hover:bg-zinc-300 transition">
        RETURN TO LOGIN
      </a>
    </div>
    )
}
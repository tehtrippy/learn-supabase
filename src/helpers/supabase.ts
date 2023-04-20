import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY)

export const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    return { data, error }
}

export const signup = async ({ email, password, name, job }) => {
    const { data, error } = await supabase.auth.signUp({
        email, password,
        options: {
            data: {
                name,
                job
            }
        }
    })
    return { data, error }
}

export const signin = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email, password
    })
    return { data, error }
}

export const signout = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
}

export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return { user }
}

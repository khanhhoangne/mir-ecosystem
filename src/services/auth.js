import { supabase } from "@/services/supabaseClient";

export async function signUp(username, password) {
  const emailFake = `${username}@fake.com`;

  const { data, error } = await supabase.auth.signUp({
    email: emailFake,
    password,
  });

  if (error) throw error;
  return data.user;
}

export async function signIn(username, password) {
  const emailFake = `${username}@fake.com`;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailFake,
    password,
  });

  if (error) throw error;
  return data.user;
}

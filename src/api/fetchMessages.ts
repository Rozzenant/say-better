import { supabase } from "../lib/supabaseClient";
import type { Message } from "../types/message";

export async function fetchMessages(): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Message[];
}
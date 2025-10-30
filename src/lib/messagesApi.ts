import { supabase } from "./supabaseClient";
import type { Message } from "../types/message";

export async function fetchMessages(): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error("Ошибка при загрузке сообщений");
  return data as Message[];
}

export async function sendMessage(content: string): Promise<Message> {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ content }])
    .select()
    .single();

  if (error) throw new Error("Ошибка при вставке сообщения");
  return data as Message;
}

export async function updateMessage(id: number, transformed: string): Promise<Message> {
  const { data, error } = await supabase
    .from("messages")
    .update({ transformed })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Ошибка при обновлении сообщения");
  return data as Message;
}

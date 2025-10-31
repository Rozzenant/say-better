import { useEffect, useRef, useState } from "react";
import type { Message } from "../types/message";
import { fetchMessages, sendMessage, updateMessage } from "../lib/messagesApi";
import { fetchLLMResponse } from "../api/fetchLLMResponse";
import { fetchBotHubResponse } from "../api/fetchBotHub";
import type { SystemPromptRole } from "../prompts/systemPrompt";

const stripSurroundingQuotes = (input: string): string => {
  const trimmed = input.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

export function useMessages(selectedRole: SystemPromptRole) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [deliveryStatus, setDeliveryStatus] = useState<Record<number, "success" | "error">>({});
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const useBothub = !!import.meta.env.VITE_BOTHUB_API_KEY?.trim();

  const fetchTransformed = async (text: string, role: SystemPromptRole) => {
    return useBothub
      ? await fetchBotHubResponse(text, role)
      : await fetchLLMResponse(text, role);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMessages();
        setMessages(data);
        const map: Record<number, "success"> = {};
        data.forEach((msg) => (map[msg.id] = "success"));
        setDeliveryStatus(map);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const submitMessage = async (text: string) => {
    setIsLoading(true);
    try {
      const msg = await sendMessage(text);
      setMessages((prev) => [...prev, msg]);
      setDeliveryStatus((prev) => ({ ...prev, [msg.id]: "success" }));

      const transformed = await fetchTransformed(text, selectedRole);
      if (!transformed) {
        console.error("Ошибка получения ответа от LLM");
        setIsLoading(false);
        return;
      }

      const updated = await updateMessage(msg.id, stripSurroundingQuotes(transformed));
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? updated : m)));
    } catch (err) {
      console.error(err);
      const tempId = Date.now();
      setMessages((prev) => [...prev, { id: tempId, content: text }]);
      setDeliveryStatus((prev) => ({ ...prev, [tempId]: "error" }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    chatRef,
    isLoading,
    deliveryStatus,
    submitMessage,
  };
}

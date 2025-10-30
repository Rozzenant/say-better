import { useEffect, useRef, useState } from "react";
import type { Message } from "../types/message";
import { fetchMessages, sendMessage, updateMessage } from "../lib/messagesApi";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [deliveryStatus, setDeliveryStatus] = useState<Record<number, "success" | "error">>({});
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

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

      const transformed = `(вежливо: "${text}")`;
      const updated = await updateMessage(msg.id, transformed);

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

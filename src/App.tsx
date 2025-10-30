import { useEffect, useRef, useState } from "react";
import "./App.css";
import MessageForm from "./components/MessageForm/MessageForm";

interface Message {
  id: number;
  content: string;
  role: "user" | "llm";
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (text: string) => {
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now(),
      content: text,
      role: "user",
    };

    const llmMessage: Message = {
      id: Date.now() + 1,
      content: `${text}`,
      role: "llm",
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      setMessages((prev) => [...prev, llmMessage]);
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="app">
      <h1>Say Better</h1>
      <div className="chat" ref={chatRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <MessageForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
}

export default App;

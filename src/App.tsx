import "./App.css";
import MessageForm from "./components/MessageForm/MessageForm";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import type { SystemPromptRole } from "./prompts/systemPrompt";
import { useMessages } from "./hooks/useMessages";
import { useState } from "react";

function App() {
  const [role, setRole] = useState<SystemPromptRole>("polite");
  const {
    messages,
    chatRef,
    isLoading,
    deliveryStatus,
    submitMessage,
  } = useMessages(role);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as SystemPromptRole);
  };

  return (
    <div className="app">
      <header className="main-name">
        <h1>Say Better</h1>
        <select aria-label="Выбор стиля ответа" className="role-selector" value={role} onChange={handleRoleChange}>
          <option value="polite">Вежливый</option>
          <option value="sarcastic">Саркастичный</option>
          <option value="rude">Грубый</option>
          <option value="neutral">Нейтральный</option>
          <option value="summary">Сжатчик</option>
          <option value="translator">Переводчик на английский</option>
        </select>
      </header>

      <div className="chat" ref={chatRef}>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} status={deliveryStatus[msg.id]} />
        ))}
      </div>

      <MessageForm onSubmit={submitMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;

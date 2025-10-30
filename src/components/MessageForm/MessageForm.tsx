import React, { useState } from "react";
import "./MessageForm.css";

interface Props {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const MessageForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
    setInput("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите сообщение..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        minLength={5}
        maxLength={200}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Отправить"}
      </button>
    </form>
  );
};

export default MessageForm;

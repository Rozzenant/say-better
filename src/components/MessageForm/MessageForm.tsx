import React, { useState } from "react";
import "./MessageForm.css";

interface Props {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const MIN_LENGTH = 5;
const MAX_LENGTH = 200;
const FORBIDDEN_CHARS = /[<>$%{}"]/;

const MessageForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();

    if (text.length < MIN_LENGTH || text.length > MAX_LENGTH) {
      setError(`Сообщение должно быть от ${MIN_LENGTH} до ${MAX_LENGTH} символов.`);
      return;
    }

    if (FORBIDDEN_CHARS.test(text)) {
      setError("Сообщение содержит недопустимые символы: <, >, $, %, {, }, \".");
      return;
    }

    setError(null);
    onSubmit(text);
    setInput("");
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Введите сообщение..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Отправить"}
        </button>
      </form>

      <div className="error-message">{error}</div>
    </>
  );
};

export default MessageForm;

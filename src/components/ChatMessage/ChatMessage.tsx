import React from "react";
import type { Message } from "../../types/message";

interface Props {
  msg: Message;
  status: "success" | "error" | undefined;
}

const ChatMessage: React.FC<Props> = ({ msg, status }) => {
  return (
    <div>
      <div className="message user">{msg.content}</div>

      {status && (
        <div className={`delivery-status ${status === "success" ? "status-success" : "status-error"}`}>
          {status === "success" ? "Успешно" : "Не удалось отправить"}
        </div>
      )}

      {msg.transformed && (
        <div className="message llm">{msg.transformed}</div>
      )}
    </div>
  );
};

export default ChatMessage;

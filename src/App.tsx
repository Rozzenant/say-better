import "./App.css";
import MessageForm from "./components/MessageForm/MessageForm";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import { useMessages } from "./hooks/useMessages";

function App() {
  const {
    messages,
    chatRef,
    isLoading,
    deliveryStatus,
    submitMessage,
  } = useMessages();

  return (
    <div className="app">
      <header className="main-name">
        <h1>Say Better</h1>
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
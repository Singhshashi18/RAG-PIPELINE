import { useState } from "react";

export const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = async () => {
    const res = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages(prev => [...prev, `🧑: ${input}`, `🤖: ${data.reply}`]);
    setInput("");
  };

  return (
    <div>
      <h2>RAG Chatbot</h2>
      <div>{messages.map((msg, i) => <p key={i}>{msg}</p>)}</div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

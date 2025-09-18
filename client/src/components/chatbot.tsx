      
import { useState } from "react";

export const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setMessages(prev => [...prev, `🧑: ${input}`, `🤖: ${data.reply}`]);
      setInput("");
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: "1rem", borderRadius: 8, background: "#1a1a1a", color: "#fff", boxShadow: "0 2px 8px #0002" }}>
      <h2 style={{ marginBottom: "1rem" }}>RAG Chatbot</h2>
      <div style={{ minHeight: 120, marginBottom: "1rem", background: "#222", borderRadius: 4, padding: "0.5rem", overflowY: "auto" }}>
        {messages.length === 0 ? <p style={{ color: "#888" }}>Start the conversation...</p> : messages.map((msg, i) => <p key={i} style={{ margin: "0.5em 0" }}>{msg}</p>)}
      </div>
      {error && <div style={{ color: "#ff4d4f", marginBottom: "0.5rem" }}>{error}</div>}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
          disabled={loading}
          style={{ flex: 1, padding: "0.5rem", borderRadius: 4, border: "1px solid #333", background: "#222", color: "#fff" }}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{ padding: "0.5rem 1rem", borderRadius: 4, border: "none", background: "#646cff", color: "#fff", cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

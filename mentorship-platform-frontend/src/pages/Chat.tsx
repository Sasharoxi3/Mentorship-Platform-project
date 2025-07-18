import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

interface Message {
  _id: string;
  sender: { _id: string; name: string };
  receiver: { _id: string; name: string };
  content: string;
  createdAt: string;
}

const Chat = () => {
  const { userId } = useParams(); // ID of the user you're chatting with
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get(`/api/messages/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err: any) {
        setError("Failed to load messages");
        console.error(err);
      }
    };

    if (userId) fetchMessages();
  }, [userId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await API.post(
        "/api/messages",
        { receiverId: userId, content: newMessage },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err: any) {
      setError("Failed to send message");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Chat</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: "1rem", marginBottom: "1rem" }}>
        {messages.map((msg) => (
          <div key={msg._id} style={{ marginBottom: "1rem" }}>
            <strong>{msg.sender.name}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "80%", marginRight: "10px" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;

import { useEffect, useState } from "react";
import API from "../services/api";

interface Announcement {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
}

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [form, setForm] = useState({ title: "", message: "" });
  const [message, setMessage] = useState("");

  const fetchAnnouncements = async () => {
    const token = localStorage.getItem("token");
    const res = await API.get("/api/admin/announcements", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAnnouncements(res.data);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/api/admin/announcements", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Announcement posted!");
      setForm({ title: "", message: "" });
      fetchAnnouncements();
    } catch (err) {
      setMessage("Failed to post announcement.");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Platform Announcements</h2>
      <form onSubmit={submit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ width: "100%", marginBottom: "10px" }}
          required
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{ width: "100%", height: "100px", marginBottom: "10px" }}
          required
        />
        <button type="submit">Post</button>
        {message && <p>{message}</p>}
      </form>

      {announcements.map((a) => (
        <div
          key={a._id}
          style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
        >
          <h3>{a.title}</h3>
          <p>{a.message}</p>
          <p style={{ fontSize: "0.8rem", color: "gray" }}>
            Posted on {new Date(a.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminAnnouncements;

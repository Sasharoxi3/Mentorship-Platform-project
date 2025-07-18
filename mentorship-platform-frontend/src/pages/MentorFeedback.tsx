import { useEffect, useState } from "react";
import API from "../services/api";

interface Session {
  _id: string;
  mentee: { _id: string; name: string; email: string };
  scheduledAt: string;
  feedback?: string;
  rating?: number;
}

const MentorFeedback = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get("/api/sessions/mentor", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSessions(res.data);
      } catch (err: any) {
        setError("Failed to load feedback sessions.");
        console.error(err);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Mentor Feedback</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {sessions.length === 0 ? (
        <p>No completed sessions with feedback yet.</p>
      ) : (
        sessions.map((session) => (
          <div
            key={session._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p><strong>Mentee:</strong> {session.mentee.name}</p>
            <p><strong>Email:</strong> {session.mentee.email}</p>
            <p><strong>Date:</strong> {new Date(session.scheduledAt).toLocaleString()}</p>
            <p><strong>Rating:</strong> {session.rating ?? "N/A"}</p>
            <p><strong>Feedback:</strong> {session.feedback || "No feedback given"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MentorFeedback;

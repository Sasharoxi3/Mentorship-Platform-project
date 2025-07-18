import { useEffect, useState } from "react";
import API from "../services/api";

interface Session {
  _id: string;
  scheduledAt: string;
  mentor: { name: string; email: string };
  status: string;
  feedback?: string;
  rating?: number;
}

const MySessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get("/api/sessions/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessions(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load sessions");
      }
    };

    fetchSessions();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>My Sessions</h2>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
          {error}
        </p>
      )}

      {sessions.length === 0 ? (
        <p style={{ textAlign: "center" }}>No sessions yet.</p>
      ) : (
        sessions.map((session) => (
          <div
            key={session._id}
            style={{
              backgroundColor: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              marginBottom: "1.5rem",
              border: "1px solid #eee",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem", color: "#333" }}>
              Mentor: {session.mentor.name}
            </h3>
            <p style={{ margin: "0.3rem 0", color: "#555" }}>
              <strong>Email:</strong> {session.mentor.email}
            </p>
            <p style={{ margin: "0.3rem 0", color: "#555" }}>
              <strong>Scheduled At:</strong>{" "}
              {new Date(session.scheduledAt).toLocaleString()}
            </p>
            <p style={{ margin: "0.3rem 0", color: "#555" }}>
              <strong>Status:</strong> {session.status}
            </p>

            {session.status === "completed" && (
              <>
                <p style={{ margin: "0.3rem 0", color: "#555" }}>
                  <strong>Rating:</strong> {session.rating}/5
                </p>
                <p style={{ margin: "0.3rem 0", color: "#555" }}>
                  <strong>Feedback:</strong>{" "}
                  {session.feedback || "No feedback provided"}
                </p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MySessions;

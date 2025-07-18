import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

interface Request {
  _id: string;
  mentee: { _id: string; name: string; email: string };
  status: string;
  createdAt: string;
}

const MentorRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await API.get("/api/requests/incoming", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch requests");
    }
  };

  const updateStatus = async (id: string, status: "accepted" | "rejected") => {
    try {
      await API.put(
        `/api/requests/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(`Request ${status}`);
      fetchRequests(); // refresh list
    } catch (err) {
      console.error(err);
      setError("Failed to update request");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Incoming Mentorship Requests
      </h2>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
          {error}
        </p>
      )}
      {message && (
        <p style={{ color: "green", textAlign: "center", marginBottom: "1rem" }}>
          {message}
        </p>
      )}

      {requests.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>
          No incoming requests.
        </p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
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
              {req.mentee.name}
            </h3>
            <p style={{ margin: "0.3rem 0", color: "#555" }}>
              <strong>Email:</strong> {req.mentee.email}
            </p>
            <p style={{ margin: "0.3rem 0", color: "#555" }}>
              <strong>Status:</strong> {req.status}
            </p>
            <p style={{ margin: "0.3rem 0", color: "#555" }}>
              <strong>Date:</strong>{" "}
              {new Date(req.createdAt).toLocaleString()}
            </p>

            {req.status === "pending" && (
              <div style={{ marginTop: "1rem" }}>
                <button
                  onClick={() => updateStatus(req._id, "accepted")}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(req._id, "rejected")}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            )}

            {req.status === "accepted" && (
              <div style={{ marginTop: "1rem" }}>
                <button
                  onClick={() => navigate(`/chat/${req.mentee._id}`)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#2196F3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Message Mentee
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MentorRequests;

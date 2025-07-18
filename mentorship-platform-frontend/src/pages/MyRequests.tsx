// src/pages/MyRequests.tsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

interface Request {
  _id: string;
  mentor: { _id: string; name: string; email: string };
  status: string;
  createdAt: string;
}

const MyRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const res = await API.get("/api/requests/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch requests");
      }
    };

    fetchMyRequests();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Mentorship Requests</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {requests.length === 0 ? (
        <p>You have not sent any requests.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p><strong>Mentor:</strong> {req.mentor.name}</p>
            <p><strong>Email:</strong> {req.mentor.email}</p>
            <p><strong>Status:</strong> {req.status}</p>
            <p><strong>Date:</strong> {new Date(req.createdAt).toLocaleString()}</p>

            {req.status === "accepted" && (
              <button onClick={() => navigate(`/chat/${req.mentor._id}`)}>
                Message Mentor
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyRequests;

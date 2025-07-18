import { useEffect, useState } from "react";
import API from "../services/api";

interface Feedback {
  _id: string;
  feedback: string;
  rating: number;
  mentor: { name: string; email: string };
  mentee: { name: string; email: string };
}

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/api/admin/feedback", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(res.data);
      } catch (err: any) {
        setError("Failed to load feedback");
        console.error(err);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>User Feedback</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        feedbacks.map((fb, idx) => (
          <div
            key={idx}
            style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
          >
            <p><strong>Mentee:</strong> {fb.mentee.name} ({fb.mentee.email})</p>
            <p><strong>Mentor:</strong> {fb.mentor.name} ({fb.mentor.email})</p>
            <p><strong>Rating:</strong> {fb.rating}</p>
            <p><strong>Feedback:</strong> {fb.feedback}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminFeedback;

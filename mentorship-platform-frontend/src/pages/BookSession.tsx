import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const BookSession = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [scheduledAt, setScheduledAt] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await API.post(
        "/api/sessions",
        { mentorId, scheduledAt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Session booked successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err: any) {
      setMessage("Failed to book session.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Book a Session</h2>
      <form onSubmit={handleBooking}>
        <label>Date & Time:</label>
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit">Book Session</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookSession;

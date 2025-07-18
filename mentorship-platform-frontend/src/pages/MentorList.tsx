import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

interface Mentor {
  _id: string;
  name: string;
  email: string;
  skills: string[];
  bio?: string;
}

const MentorList = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filtered, setFiltered] = useState<Mentor[]>([]);
  const [skillFilter, setSkillFilter] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await API.get("/api/mentors");
        setMentors(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch mentors", err);
      }
    };
    fetchMentors();
  }, []);

  const handleFilter = () => {
    if (!skillFilter) return setFiltered(mentors);
    const result = mentors.filter((mentor) =>
      mentor.skills?.some((skill) =>
        skill.toLowerCase().includes(skillFilter.toLowerCase())
      )
    );
    setFiltered(result);
  };

  const sendRequest = async (mentorId: string) => {
    try {
      await API.post(
        "/api/requests",
        { mentorId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Mentorship request sent!");
    } catch (err) {
      setMessage("Failed to send request.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Find a Mentor</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="Filter by skill"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          style={{
            padding: "0.6rem 1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            width: "250px",
          }}
        />
        <button
          onClick={handleFilter}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {message && (
        <p style={{ textAlign: "center", color: "#4CAF50", marginBottom: "1rem" }}>
          {message}
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {filtered.map((mentor) => (
          <div
            key={mentor._id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              padding: "1.5rem",
              backgroundColor: "#fff",
              transition: "0.3s ease",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem", color: "#333" }}>{mentor.name}</h3>
            <p style={{ margin: "0.3rem 0", color: "#555" }}>
              <strong>Email:</strong> {mentor.email}
            </p>
            <p style={{ margin: "0.3rem 0", color: "#555" }}>
              <strong>Skills:</strong> {mentor.skills?.join(", ") || "N/A"}
            </p>
            <p style={{ margin: "0.3rem 0", color: "#555" }}>
              <strong>Bio:</strong> {mentor.bio || "No bio provided"}
            </p>
            <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
              <button
                onClick={() => sendRequest(mentor._id)}
                style={{
                  padding: "0.6rem 1rem",
                  backgroundColor: "#2196F3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Request Mentorship
              </button>
              <button
                onClick={() => navigate(`/mentors/${mentor._id}`)}
                style={{
                  padding: "0.6rem 1rem",
                  backgroundColor: "#f1f1f1",
                  color: "#333",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorList;

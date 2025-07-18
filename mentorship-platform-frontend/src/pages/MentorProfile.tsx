import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";


interface Mentor {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  skills?: string[];
}

const MentorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  


  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/api/mentors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMentor(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load mentor profile");
      }
    };

    fetchMentor();
  }, [id]);

  const requestMentorship = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/api/requests",
        { mentorId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Mentorship request sent!");
    } catch (err) {
      setMessage("Failed to send mentorship request.");
      console.error(err);
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!mentor) return <p>Loading mentor profile...</p>;

  return (
    <div style={{
      maxWidth: "600px",
      margin: "50px auto",
      padding: "2rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <h2>{mentor.name}</h2>
      <p><strong>Email:</strong> {mentor.email}</p>
      <p><strong>Bio:</strong> {mentor.bio || "No bio available"}</p>
      <p><strong>Skills:</strong> {mentor.skills?.join(", ") || "No skills listed"}</p>

      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}

      <div style={{ marginTop: "20px" }}>
        <button onClick={requestMentorship} style={{ marginRight: "10px" }}>
          Request Mentorship
        </button>
        <button
  onClick={() => navigate(`/book/${mentor._id}`)}
  style={{ marginTop: "10px", marginRight: "10px" }}
>
  Book a Session
</button>

       <button onClick={() => navigate(-1)}>Back</button>

      </div>
    </div>
  );
};

export default MentorProfile;

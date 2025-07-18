import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const renderRoleView = () => {
    switch (user?.role) {
      case "mentee":
        return (
          <>
            <h3>Mentee Dashboard</h3>
            <p>Browse mentors, send mentorship requests, and book sessions.</p>
            <button onClick={() => navigate("/mentors")}>View Mentors</button>
            <button onClick={() => navigate("/mysessions")} style={{ marginLeft: "10px" }}>
              My Sessions
            </button>
            <button onClick={() => navigate("/requests")} style={{ marginLeft: "10px" }}>
              Track Requests
            </button>
          </>
        );
      case "mentor":
        return (
          <>
            <h3>Mentor Dashboard</h3>
            <p>Review requests, manage session schedules, and respond to mentees.</p>
            <button onClick={() => navigate("/mentor-requests")}>View Requests</button>
          </>
        );
      case "admin":
        return (
          <>
            <h3>Admin Dashboard</h3>
            <p>Manage users, assign roles, and oversee all platform activity.</p>
            <button onClick={() => navigate("/admin/users")}>Manage Users</button>
            <button onClick={() => navigate("/admin/stats")} style={{ marginLeft: "10px" }}>
              View Stats
            </button>
          </>
        );
      default:
        return <p>Unknown role</p>;
    }
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <div className="role-section">{renderRoleView()}</div>
    </div>
  );
};

export default Dashboard;

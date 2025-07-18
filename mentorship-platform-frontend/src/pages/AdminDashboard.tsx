import { useEffect, useState } from "react";
import API from "../services/api";

interface Stats {
  totalUsers: number;
  totalMentors: number;
  totalMentees: number;
  totalRequests: number;
  totalSessions: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load statistics.");
      }
    };

    fetchStats();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!stats) return <p>Loading statistics...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Platform Statistics</h2>
      <ul style={{ lineHeight: "1.8" }}>
        <li><strong>Total Users:</strong> {stats.totalUsers}</li>
        <li><strong>Total Mentors:</strong> {stats.totalMentors}</li>
        <li><strong>Total Mentees:</strong> {stats.totalMentees}</li>
        <li><strong>Total Requests:</strong> {stats.totalRequests}</li>
        <li><strong>Total Sessions:</strong> {stats.totalSessions}</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;

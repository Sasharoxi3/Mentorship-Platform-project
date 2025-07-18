import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MentorList from "./pages/MentorList";
import MentorProfile from "./pages/MentorProfile";
import BookSession from "./pages/BookSession";
import MySessions from "./pages/MySessions";
import MentorRequests from "./pages/MentorRequests";
import Chat from "./pages/Chat";
import MentorFeedback from "./pages/MentorFeedback";
import AdminDashboard from "./pages/AdminDashboard";
import MyRequests from "./pages/MyRequests";
import AdminUsers from "./pages/AdminUsers";
import AdminFeedback from "./pages/AdminFeedback";
import AdminAnnouncements from "./pages/AdminAnnouncements";

const App = () => {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mentors" element={<MentorList />} />
        <Route path="/mentors/:id" element={<MentorProfile />} />
        <Route path="/book/:mentorId" element={<BookSession />} />
        <Route path="/mysessions" element={<MySessions />} />
        <Route path="/requests" element={<MentorRequests />} />
        <Route path="/chat/:userId" element={<Chat />} />
        <Route path="/mentor-feedback" element={<MentorFeedback />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />


      </Routes>
    </Router>
  );
};

export default App;

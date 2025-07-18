import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">MentorWorld</Link>
      </div>
      <ul className="navbar__links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/mentors">Mentors</Link></li>
        <li><Link to="/sessions">My Sessions</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

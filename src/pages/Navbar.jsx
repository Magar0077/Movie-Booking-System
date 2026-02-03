import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav className="navbar-wrapper">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          CineBook
        </Link>
      </div>

      <div className="navbar-right">
        {!user ? (
          <Link to="/login" className="navbar-login">
            Login
          </Link>
        ) : (
          <Link to="/profile" className="navbar-login">
            Profile
          </Link>
        )}
      </div>
    </nav>
  );
}

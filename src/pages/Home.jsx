import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Home() {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <div className="home-wrapper">
      {/* Header */}
      <header className="home-header">
        <h1 className="home-logo">🎬 Movie Booking</h1>
        <button onClick={handleLogout} className="home-logout">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <section className="home-hero">
          <h2>Welcome Back!</h2>
          <p>
            Book your favorite movies, choose seats, and enjoy the show.
            This is the home page after successful login.
          </p>
        </section>

        {/* Feature Cards */}
        <section className="home-features">
          <div className="feature-card">
            <h3>🎥 Latest Movies</h3>
            <p>
              Browse the latest movies currently available in theaters.
            </p>
          </div>

          <div className="feature-card">
            <h3>💺 Seat Selection</h3>
            <p>
              Choose your preferred seats easily with our seat map.
            </p>
          </div>

          <div className="feature-card">
            <h3>📄 My Bookings</h3>
            <p>
              View and manage your previous and upcoming bookings.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2026 Movie Booking System. All rights reserved.</p>
      </footer>
    </div>
  );
}

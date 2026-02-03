import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";

export default function Home() {
  const movies = [
    {
      id: 1,
      title: "Avengers: Endgame",
      img: "/movies/avengers.jpg",
      location: "CineBook Mall",
      description: "The epic conclusion to the Avengers saga.",
    },
    {
      id: 2,
      title: "The Batman",
      img: "/movies/batman.jpg",
      location: "CineBook Downtown",
      description: "Gotham’s dark knight faces his biggest challenge yet.",
    },
    {
      id: 3,
      title: "Frozen II",
      img: "/movies/frozen.jpg",
      location: "CineBook Mall",
      description: "Anna and Elsa embark on a magical journey.",
    },
  ];

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextPoster();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const nextPoster = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
    scrollToIndex((currentIndex + 1) % movies.length);
  };

  const prevPoster = () => {
    const newIndex = currentIndex === 0 ? movies.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: index * width,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="home-wrapper">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h2>Welcome to CineBook</h2>
          <p>Experience the magic of cinema. Book your favorite movies now!</p>
        </div>
      </section>

      {/* Top Scrolling Poster Carousel */}
      <section className="carousel-section">
        <div className="carousel-container">
          {/* Left arrow */}
          <button className="carousel-arrow left-arrow" onClick={prevPoster}>
            &lt;
          </button>

          {/* Carousel */}
          <div className="carousel-wrapper" ref={carouselRef}>
            {movies.map((movie) => (
              <div key={movie.id} className="carousel-card">
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="carousel-img"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x400?text=Poster";
                  }}
                />
                <div className="carousel-buttons">
                  <a href={`/movies/${movie.id}`} className="hero-button-small">
                    Book Now
                  </a>
                  <a href={`/location`} className="hero-button-small">
                    See Location
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button className="carousel-arrow right-arrow" onClick={nextPoster}>
            &gt;
          </button>
        </div>
      </section>

      {/* Movies Grid/List Below */}
      <section className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="feature-card">
            <img
              src={movie.img}
              alt={movie.title}
              className="feature-img"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x400?text=Poster";
              }}
            />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <a href={`/movies/${movie.id}`} className="hero-button-small">
              Book Now
            </a>
          </div>
        ))}
      </section>

      <footer className="home-footer">
        <p>© 2026 CineBook. All rights reserved.</p>
      </footer>
    </div>
  );
}

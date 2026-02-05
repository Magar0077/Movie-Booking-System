import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const Home = () => {
  const [movies, setMovies] = useState([]); 
  const [heroMovies, setHeroMovies] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const popularScrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch from TMDB
        const tmdbRes = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=80d491707d8cf7b38aa19c7ccab0952f'
        );
        setHeroMovies(tmdbRes.data.results.slice(0, 12));

        // Fetch from Firestore
        const querySnapshot = await getDocs(collection(db, "movies"));
        setMovies(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === 4 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? 4 : prev - 1));
  };

  useEffect(() => {
    if (heroMovies.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [heroMovies]);

  const scrollPopular = (direction) => {
    if (popularScrollRef.current) {
      const { scrollLeft, clientWidth } = popularScrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      popularScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) return (
    <div className="h-screen bg-[#0f0f0f] flex items-center justify-center text-yellow-500 font-black italic tracking-widest">
      LOADING CINEBOOK...
    </div>
  );

  return (
    <div className="bg-[#0f0f0f] min-h-screen pb-20 text-white selection:bg-yellow-500 selection:text-black">
      
      {/* SECTION 1: WELCOME HEADER */}
      <header className="py-12 px-4 text-center bg-gradient-to-b from-yellow-500/10 to-transparent">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-2 text-white">
          WELCOME TO <span className="text-yellow-500">CINEBOOK</span>
        </h1>
        <p className="text-gray-500 tracking-[0.6em] uppercase text-[10px] font-bold">
          Your Premium Movie Destination
        </p>
      </header>

      {/* SECTION 2: HERO CAROUSEL */}
      <section className="h-[65vh] w-full relative overflow-hidden group">
        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-3 rounded-full border border-white/10 text-white hover:text-yellow-500 transition-all opacity-0 group-hover:opacity-100">
          <ChevronLeft size={40} />
        </button>

        {heroMovies.slice(0, 5).map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div 
              className="h-full w-full bg-cover bg-center flex items-end pb-24" 
              style={{ 
                backgroundImage: `linear-gradient(to top, rgba(15,15,15,1), transparent), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` 
              }}
            >
              <div className="container mx-auto px-10">
                <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-6 max-w-2xl leading-none tracking-tighter drop-shadow-2xl">
                  {movie.title}
                </h2>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-cyan-500 text-white px-8 py-3 text-[12px] font-black rounded-sm uppercase italic hover:bg-cyan-400 transition shadow-lg tracking-widest">BUY NOW</button>
                  <button className="flex items-center gap-2 bg-transparent border-2 border-yellow-500 text-yellow-500 px-6 py-3 text-[12px] font-black rounded-sm uppercase italic hover:bg-yellow-500 hover:text-black transition shadow-lg tracking-widest">
                    <MapPin size={16} /> SEE LOCATION
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-3 rounded-full border border-white/10 text-white hover:text-yellow-500 transition-all opacity-0 group-hover:opacity-100">
          <ChevronRight size={40} />
        </button>
      </section>

      <main className="container mx-auto px-6 mt-20 space-y-24">
        
        {/* SECTION 3: POPULAR MOVIES (TMDB) */}
        <section className="relative group">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1.5 bg-cyan-500"></div>
            <h2 className="text-3xl font-black uppercase italic tracking-tight">Popular Movies</h2>
          </div>
          
          <div 
            ref={popularScrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {heroMovies.map((movie) => (
              <div key={movie.id} className="snap-start min-w-[280px]">
                {/* TMDB uses movie.poster_path */}
                <MovieCard 
                  movie={movie} 
                  isTMDB={true} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: NOW SHOWING (Firestore) */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1.5 bg-yellow-500"></div>
            <h2 className="text-3xl font-black uppercase italic tracking-tight">Now Showing</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} // movie.image comes from Firestore
                isTMDB={false} 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
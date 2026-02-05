import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Clock, MapPin, Tag, Play, Armchair, CheckCircle } from 'lucide-react';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [tmdbTrailer, setTmdbTrailer] = useState(null);
  const [tmdbData, setTmdbData] = useState({ runtime: null, poster: null });
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const rows = ['A', 'B', 'C', 'D'];
  const nums = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const fetchMovieAndTrailer = async () => {
      try {
        if (!id) return;
        
        // 1. Fetch from Firebase
        const docRef = doc(db, "movies", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const movieData = { id: docSnap.id, ...docSnap.data() };
          
          // 2. Search TMDB for missing Info (Trailer, Runtime, or Image)
          try {
            const searchRes = await axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=80d491707d8cf7b38aa19c7ccab0952f&query=${encodeURIComponent(movieData.title)}`
            );
            
            if (searchRes.data.results.length > 0) {
              const tmdbId = searchRes.data.results[0].id;
              
              // Fetch Full Details (this gives us the "runtime" and "videos")
              const detailRes = await axios.get(
                `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=80d491707d8cf7b38aa19c7ccab0952f&append_to_response=videos`
              );

              setTmdbData({
                runtime: detailRes.data.runtime,
                poster: `https://image.tmdb.org/t/p/original${detailRes.data.backdrop_path}`
              });

              const trailer = detailRes.data.videos?.results.find(
                v => v.type === "Trailer" && v.site === "YouTube"
              );
              if (trailer) setTmdbTrailer(trailer.key);
            }
          } catch (apiErr) {
            console.error("TMDB Fallback Error:", apiErr);
          }

          setMovie(movieData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieAndTrailer();
  }, [id]);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleSeatClick = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    if (!selectedTime || selectedSeats.length === 0) {
      alert("Please select showtime and seats!");
      return;
    }
    try {
      await addDoc(collection(db, "bookings"), {
        movieTitle: movie.title,
        time: selectedTime,
        seats: selectedSeats,
        theatre: movie.theatre || "Grand Cinema",
        bookedAt: new Date().toISOString()
      });
      alert("Booking Confirmed!");
      navigate('/movies');
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="h-screen bg-[#0f0f0f] flex items-center justify-center text-yellow-500 font-black italic uppercase tracking-widest">Loading Cinema...</div>;
  if (!movie) return <div className="h-screen bg-[#0f0f0f] flex items-center justify-center text-red-500 uppercase font-black">Movie Not Found</div>;

  const finalVideoId = getYouTubeId(movie.trailerUrl || movie.traierUrl) || tmdbTrailer;
  // Use Firebase image, if empty use TMDB backdrop
  const finalImage = movie.image || tmdbData.poster;
  // Use Firebase time, if empty use TMDB runtime
  const finalTime = movie.time || movie.duration || tmdbData.runtime || "120";

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pb-20">
      <div className="h-[45vh] w-full relative">
        <img src={finalImage} alt="" className="w-full h-full object-cover opacity-25 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#0f0f0f]/80" />
      </div>

      <div className="container mx-auto px-6 -mt-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-10">
            <div className="aspect-video w-full bg-black border border-white/10 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {finalVideoId ? (
                <iframe
                  width="100%" height="100%"
                  src={`https://www.youtube.com/embed/${finalVideoId}?autoplay=0&rel=0`}
                  title="Movie Trailer" frameBorder="0" allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 uppercase font-black italic text-center px-10">
                  Trailer Unavailable
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h1 className="text-7xl font-black italic uppercase tracking-tighter leading-none text-white drop-shadow-md">{movie.title}</h1>
              <p className="text-gray-400 text-sm leading-relaxed uppercase font-bold tracking-wide max-w-2xl italic">
                {movie.description || movie.overview || "Cinematic masterpiece specially selected for our viewers."}
              </p>
            </div>

            <div className="bg-[#141414] p-10 border border-white/5 rounded-sm">
              <h2 className="text-yellow-500 font-black uppercase italic mb-12 flex items-center justify-center gap-2 tracking-widest">
                <Armchair size={18} /> Select Your Seats
              </h2>
              <div className="flex flex-col gap-4 items-center">
                {rows.map(row => (
                  <div key={row} className="flex gap-4">
                    {nums.map(n => {
                      const sId = `${row}${n}`;
                      const active = selectedSeats.includes(sId);
                      return (
                        <button key={sId} onClick={() => handleSeatClick(sId)}
                          className={`w-9 h-9 rounded-t-xl text-[10px] font-black transition-all duration-300 ${active ? "bg-cyan-500 text-black scale-110 shadow-[0_0_20px_rgba(6,182,212,0.6)]" : "bg-gray-800 text-gray-500 hover:bg-yellow-500 hover:text-black"}`}>
                          {sId}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="w-1/2 h-1 bg-cyan-900/30 mx-auto mt-12 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-500 blur-sm"></div>
              </div>
              <p className="text-center text-[8px] text-cyan-700 font-black uppercase mt-2 tracking-[0.5em]">Theater Screen</p>
            </div>
          </div>

          <div className="bg-[#141414] p-8 border border-white/5 self-start shadow-2xl space-y-8 sticky top-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                <Clock className="text-yellow-500" size={16} /> {finalTime} MIN
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                <Tag className="text-cyan-500" size={16} /> {movie.genre || "Featured"}
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                <MapPin className="text-red-500" size={16} /> {movie.theatre || "Grand Cinema"}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase italic tracking-widest text-yellow-500 border-b border-white/10 pb-2 flex justify-between items-center">
                Showtimes <Play size={12} fill="currentColor" />
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(() => {
                  const times = Array.isArray(movie.showtimes) ? movie.showtimes : 
                                typeof movie.showtimes === 'string' ? [movie.showtimes] : [];
                  
                  return times.length > 0 ? times.map((time, index) => (
                    <button key={index} onClick={() => setSelectedTime(time)}
                      className={`border py-4 text-[11px] font-black uppercase italic transition-all ${selectedTime === time ? "bg-yellow-500 text-black border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]" : "border-white/10 hover:border-white text-white"}`}>
                      {time}
                    </button>
                  )) : (
                    <div className="col-span-2 text-center p-4 border border-dashed border-white/10">
                       <p className="text-[10px] text-gray-500 italic uppercase">No Showtimes Available</p>
                    </div>
                  );
                })()}
              </div>
            </div>

            <button 
              onClick={handleBooking} 
              className={`w-full font-black py-5 text-xs uppercase italic tracking-[0.3em] transition-all active:scale-95 shadow-xl ${
                selectedTime && selectedSeats.length > 0 
                ? "bg-cyan-600 text-white hover:bg-cyan-500" 
                : "bg-gray-800 text-gray-600 cursor-not-allowed border border-white/5"
              }`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Clock, MapPin, Tag, Play } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const docRef = doc(db, "movies", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMovie({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return (
    <div className="h-screen bg-[#0f0f0f] flex items-center justify-center text-yellow-500 font-black italic uppercase">
      Loading Cinematic Experience...
    </div>
  );

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pb-20">
      {/* 1. BLURRED BANNER BACKGROUND */}
      <div className="h-[40vh] w-full relative">
        <img src={movie.image} alt="" className="w-full h-full object-cover opacity-20 blur-md" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* 2. LEFT SECTION: THE TRAILER (From Whiteboard Task) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video w-full bg-black border border-white/10 rounded-sm overflow-hidden shadow-2xl">
              {/* This iframe creates the trailer using the ID you pasted in Firebase */}
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${movie.trailerUrl}?autoplay=0&rel=0`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">
                {movie.title}
              </h1>
              <div className="flex gap-4">
                <span className="bg-yellow-500 text-black px-3 py-1 text-[10px] font-black uppercase italic">HD 4K</span>
                <span className="border border-white/20 px-3 py-1 text-[10px] font-black uppercase italic text-gray-400">IMAX</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed uppercase font-medium tracking-wide max-w-2xl">
                {movie.description || "A masterfully crafted cinematic journey seeded specifically for the Cinebook platform."}
              </p>
            </div>
          </div>

          {/* 3. RIGHT SECTION: SHOWTIMES (From Whiteboard Task) */}
          <div className="bg-[#141414] p-8 border border-white/5 self-start shadow-xl space-y-8">
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-300 tracking-[0.2em]">
                <Clock className="text-yellow-500" size={16} /> {movie.time || "120 MIN"}
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-300 tracking-[0.2em]">
                <Tag className="text-cyan-500" size={16} /> {movie.genre || "Action / Drama"}
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-300 tracking-[0.2em]">
                <MapPin className="text-red-500" size={16} /> {movie.theatre || "Grand Cinema"}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase italic tracking-widest text-yellow-500 border-b border-white/10 pb-2 flex justify-between">
                Available Showtimes <Play size={12} fill="currentColor" />
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                {/* This maps through the ARRAY of showtimes you added in Firebase */}
                {movie.showtimes?.map((time, index) => (
                  <button key={index} className="border border-white/10 py-3 text-[10px] font-black uppercase italic hover:bg-yellow-500 hover:text-black transition-all duration-300">
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-cyan-600 text-white font-black py-4 text-xs uppercase italic tracking-[0.2em] hover:bg-cyan-500 transition shadow-lg mt-4">
              Confirm Booking
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
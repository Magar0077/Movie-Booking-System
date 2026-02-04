import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';

const MovieCard = ({ movie, isTMDB }) => {
  // Logic to handle image source: API prefix for TMDB, direct URL for Firebase
  const posterUrl = isTMDB 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : movie.image; 

  return (
    <div className="bg-[#1a1a1a] rounded-sm overflow-hidden border border-white/5 hover:border-yellow-500/50 transition-all group flex flex-col h-full shadow-2xl">
      {/* POSTER SECTION */}
      <div className="aspect-[2/3] relative overflow-hidden bg-gray-900">
        {posterUrl ? (
          <img 
            src={posterUrl} 
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/500x750?text=Poster+Not+Found'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-[10px] font-black uppercase italic">
            No Image Found
          </div>
        )}
      </div>

      {/* DETAILS SECTION - Matching Whiteboard Sketch */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        <h3 className="text-sm font-black uppercase italic text-white truncate">
          {movie.title}
        </h3>
        
        <div className="space-y-1.5 flex-grow">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Clock size={12} className="text-yellow-500" />
            <span>{movie.time || "120 MIN"}</span>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Tag size={12} className="text-cyan-500" />
            <span>{movie.genre || "Action / Drama"}</span>
          </div>
        </div>

        {/* This Link takes you to the Movie Detail Page from the whiteboard */}
        <Link 
          to={`/movie/${movie.id}`}
          className="w-full bg-yellow-500 text-black font-black py-2.5 text-[11px] uppercase italic hover:bg-yellow-400 transition text-center block shadow-lg"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
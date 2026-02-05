import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, MapPin, PlayCircle } from 'lucide-react';

const MovieCard = ({ movie, isTMDB }) => {
  const posterUrl = isTMDB 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : movie.image; 

  return (
    <div className="bg-[#1a1a1a] rounded-sm overflow-hidden border border-white/5 hover:border-yellow-500/50 transition-all group flex flex-col h-full shadow-2xl">
      
      {/* POSTER WITH TRAILER HOVER EFFECT */}
      <div className="aspect-[2/3] relative overflow-hidden bg-gray-900">
        <img 
          src={posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 group-hover:opacity-50"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop'; }}
        />
        
        {/* Play Icon Overlay (Hints at YouTube Trailer) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle size={48} className="text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
        </div>

        {/* Top Badge for Time (Optional but looks pro) */}
        {movie.showtimes && movie.showtimes.length > 0 && (
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-yellow-500/50 px-2 py-1 rounded-sm">
            <p className="text-[9px] font-black text-yellow-500 italic uppercase">Next: {movie.showtimes[0]}</p>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        <h3 className="text-sm font-black uppercase italic text-white truncate tracking-tighter">
          {movie.title}
        </h3>
        
        <div className="space-y-1.5 flex-grow">
          {/* DURATION DISPLAY */}
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Clock size={12} className="text-yellow-500" />
            <span>{movie.duration || movie.time || "120"} MIN</span>
          </div>

          {/* SHOWTIMES DISPLAY (New) */}
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Tag size={12} className="text-cyan-500" />
            <span className="truncate">
              {Array.isArray(movie.showtimes) ? movie.showtimes.join(" • ") : "Showtimes TBD"}
            </span>
          </div>

          {!isTMDB && (
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <MapPin size={12} className="text-red-500" />
              <span>{movie.theatre || "Grand Cinema"}</span>
            </div>
          )}
        </div>

        <Link 
          to={`/movie/${movie.id}`}
          className="w-full bg-yellow-500 text-black font-black py-2.5 text-[11px] uppercase italic hover:bg-white transition-all text-center block shadow-lg tracking-widest active:scale-95"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
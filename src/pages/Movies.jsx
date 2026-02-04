import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState("All");

  useEffect(() => {
    const fetchSeededMovies = async () => {
      // Fetching from your custom Firebase collection as per task
      const querySnapshot = await getDocs(collection(db, "movies"));
      setMovies(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchSeededMovies();
  }, []);

  const filteredMovies = selectedTheatre === "All" 
    ? movies 
    : movies.filter(m => m.theatre === selectedTheatre);

  return (
    <div className="bg-[#0f0f0f] min-h-screen p-8 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Now <span className="text-yellow-500">Showing</span>
          </h1>
          
          {/* "Choose Theatre" dropdown from whiteboard sketch */}
          <div className="bg-[#1a1a1a] p-1 border border-white/10 rounded-sm w-full md:w-auto">
            <select 
              onChange={(e) => setSelectedTheatre(e.target.value)}
              className="bg-transparent text-yellow-500 p-2 text-xs font-bold uppercase outline-none cursor-pointer w-full"
            >
              <option value="All">Choose Theatre (All)</option>
              <option value="Grand Cinema">Grand Cinema</option>
              <option value="Skyline Movies">Skyline Movies</option>
              <option value="Royal Theater">Royal Theater</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} isTMDB={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
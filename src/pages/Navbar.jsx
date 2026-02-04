import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, LogOut, LayoutDashboard, Ticket, User, X } from 'lucide-react';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  // Helper to read cookies for login state
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    const token = getCookie('token');
    const userRole = getCookie('role');
    if (token === 'true') {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  return (
    <nav className="bg-[#0f0f0f] border-b border-white/10 sticky top-0 z-[1000] px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-black italic tracking-tighter text-white">
          CINE<span className="text-yellow-500">BOOK</span>
        </Link>

        {/* NAVIGATION ANCHOR TAGS */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/movies" className="text-[11px] font-black uppercase italic text-gray-400 hover:text-yellow-500 transition tracking-widest">Movies</Link>
          <Link to="/categories" className="text-[11px] font-black uppercase italic text-gray-400 hover:text-yellow-500 transition tracking-widest">Categories</Link>
          <Link to="/genre" className="text-[11px] font-black uppercase italic text-gray-400 hover:text-yellow-500 transition tracking-widest">Genre</Link>
          <Link to="/contact" className="text-[11px] font-black uppercase italic text-gray-400 hover:text-yellow-500 transition tracking-widest">Contact</Link>
        </div>

        {/* SEARCH & USER MENU */}
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition" />

          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} className="text-white hover:text-yellow-500 transition">
              {showDropdown ? <X size={28} /> : <Menu size={28} />}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-4 w-60 bg-[#1a1a1a] border border-white/10 rounded-sm shadow-2xl py-2 z-[1100]">
                {isLoggedIn ? (
                  <>
                    {role === 'admin' && (
                      <Link to="/admin" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-5 py-4 text-[11px] font-black text-yellow-500 hover:bg-white/5 uppercase italic">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                    )}
                    <Link to="/bookings" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-5 py-4 text-[11px] font-black text-gray-300 hover:bg-white/5 uppercase italic">
                      <Ticket size={16} /> My Bookings
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-4 text-[11px] font-black text-red-500 border-t border-white/5 mt-2 hover:bg-red-500/10 uppercase italic text-left">
                      <LogOut size={16} /> Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-5 py-4 text-[11px] font-black text-yellow-500 hover:bg-yellow-500 hover:text-black transition uppercase italic">
                    <User size={16} /> Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
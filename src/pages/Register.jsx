import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Ticket } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Direct Firebase Auth Call
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully! Welcome to CineBook.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-[#0f0f0f]">
      <div className="bg-[#1e1e1e] p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-800">
        <div className="text-center mb-8">
          <Ticket className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
          <h2 className="text-3xl font-bold uppercase italic text-white">Join CineBook</h2>
          <p className="text-gray-400 mt-2">Sign up to book your favorite movies</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Full Name" 
              required
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg py-3 px-10 focus:outline-none focus:border-yellow-500 transition text-white"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg py-3 px-10 focus:outline-none focus:border-yellow-500 transition text-white"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password" 
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg py-3 px-10 focus:outline-none focus:border-yellow-500 transition text-white"
            />
          </div>

          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-black py-3 rounded-lg transition duration-300 uppercase italic">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already a member? <Link to="/login" className="text-yellow-500 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
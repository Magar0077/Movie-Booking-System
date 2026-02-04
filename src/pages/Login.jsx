import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back to CineBook!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-[#0f0f0f]">
      <div className="bg-[#1e1e1e] p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-800">
        <div className="text-center mb-8">
          <LogIn className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
          <h2 className="text-3xl font-bold uppercase italic text-white">Login</h2>
          <p className="text-gray-400 mt-2">Enter your details to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
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

          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-black py-3 rounded-lg transition duration-300 uppercase italic shadow-lg shadow-yellow-500/10">
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          New to CineBook? <Link to="/register" className="text-yellow-500 hover:underline">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
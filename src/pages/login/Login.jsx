import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import sumecLogo from "../../assets/sumec-logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");       // use email for Supabase Auth
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password) // ⚠️ plain text only for demo
      .single();

    if (error || !data) {
      setErrorMsg("Invalid credentials");
    } else {
      // store userId for later use
      localStorage.setItem("userId", data.id);
      navigate("/dashboard");
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with background/logo */}
      <div
        className="md:w-1/2 w-full bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${sumecLogo})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>

        <div className="relative text-center text-white px-8">
          <h2 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
            Sumec Portal
          </h2>
          <p className="text-lg max-w-md mx-auto opacity-90">
            A secure gateway to manage your account and stay connected.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1 bg-teal-400 rounded-full shadow-lg"></div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 w-24 h-24 bg-teal-500/40 rounded-full blur-2xl"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-teal-300/30 rounded-full blur-3xl"></div>
      </div>

      {/* Right side with login form */}
      <div
        className="md:w-1/2 w-full bg-cover bg-center relative flex items-center justify-center"
       
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>

        <div className="relative text-white px-8 w-full max-w-md bg-white/10 rounded-lg p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-teal-400 text-center mb-3">Sign In</h3>
          <p className="text-center text-gray-200 mb-6">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-200">Email</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none text-black"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none text-black"
                placeholder="Enter your password"
                required
              />
            </div>

            {errorMsg && (
              <p className="text-red-400 text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:from-teal-600 hover:to-teal-700 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-200">
            <a href="#" className="hover:text-teal-400 transition">Forgot password?</a> · 
            <a href="#" className="hover:text-teal-400 transition"> Create account</a>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 w-24 h-24 bg-teal-500/40 rounded-full blur-2xl"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-teal-300/30 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default LoginPage;


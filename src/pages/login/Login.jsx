// src/pages/login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sumecLogo from "../../assets/sumec-logo.png"; // adjust path to your image

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate("/dashboard");
    }
  };

  // Example handler for "Contact your administrator"
  const handleContactAdmin = () => {
    // You can replace this with any logic you want:
    // e.g. navigate("/support"), open mailto link, or show a modal
    alert("Contact your administrator function is not yet implemented.");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-fit bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${sumecLogo})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative bg-white/80 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold text-teal-600 text-center mb-3">Sign In</h3>
        <p className="text-center text-gray-500 mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-teal-600 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <span
              onClick={handleContactAdmin}
              className="text-teal-600 font-semibold cursor-pointer hover:underline"
            >
              Contact your administrator
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

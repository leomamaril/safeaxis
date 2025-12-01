import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-primary bg-gradient">
      <div
        className="card bg-transparent border-0 shadow-lg p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <h2 className="text-center fw-bold text-white">Welcome Back</h2>
        <p className="text-center text-light mb-4">
          Sign in to continue to your account
        </p>

        <form>
          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control bg-transparent text-white border-light"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-control bg-transparent text-white border-light"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-light w-100 fw-semibold shadow-sm"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4 small text-light">
          <p className="mt-2">
            Don’t have an account?{" "}
            <a href="#" className="text-white fw-semibold text-decoration-none">
              Contact your administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

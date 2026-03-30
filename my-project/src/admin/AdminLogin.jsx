// src/admin/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/front-view-little-presents-with-xmas-tree-toys-pink-table_140725-136133.jpg";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } catch (error) {
      setError("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!firstname || !lastname || !email || !password) {
        throw new Error("All fields are required");
      }

      const response = await fetch("http://localhost:5000/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed");
      }

      const data = await response.json();
      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } catch (error) {
      setError("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <form
        onSubmit={isSignup ? handleSignup : handleLogin}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isSignup ? "Admin Sign Up" : "Admin Login"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/80 text-white rounded-lg text-sm">
            {error}
          </div>
        )}

        {isSignup && (
          <>
            <input
              type="text"
              placeholder="First Name"
              className="w-full mb-4 p-3 border bg-transparent border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full mb-4 p-3 border bg-transparent border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border bg-transparent border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border bg-transparent border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-700 transition duration-300 disabled:opacity-50"
        >
          {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-700 text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
              className="ml-2 text-blue-600 hover:text-blue-800 font-semibold"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;

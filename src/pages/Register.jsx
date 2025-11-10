import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "@/services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signUp(username, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0f29] to-[#1b1f3b] px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md p-8 rounded-2xl bg-[#121a3a]/90 backdrop-blur-md shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center">Create Account</h2>
        <p className="text-gray-400 text-center">Sign up to get started</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#1b2245] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#1b2245] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <div className="text-center text-gray-400">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}
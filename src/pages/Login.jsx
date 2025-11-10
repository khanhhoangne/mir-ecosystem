import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(username, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0b0f29] to-[#1b1f3b] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 rounded-2xl bg-[#121a3a]/90 backdrop-blur-md shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center">Login</h2>
        <p className="text-gray-400 text-center">Enter your username and password</p>

        {error && <strong className="text-red-500 text-center" style={{ color: "red", textAlign: "center", display: "block" }}>{error}</strong>}

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
          className="w-full py-3 rounded-lg text-white font-medium bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* ✅ English Register Link */}
        <div className="text-center text-gray-400">
          Don’t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign up now
          </span>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) { alert("No account found."); return; }
    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", storedUser.name);
      setUser(storedUser.name);
      mergeGuestData(storedUser.name);
      navigate("/");
    } else alert("Invalid email or password!");
  };

  const mergeGuestData = (userName) => {
    ["cart", "wishlist"].forEach((key) => {
      const guestData = JSON.parse(localStorage.getItem(`${key}_guest`)) || [];
      const userData = JSON.parse(localStorage.getItem(`${key}_${userName}`)) || [];
      const merged = [...userData, ...guestData.filter(g => !userData.some(u => u.id === g.id))];
      localStorage.setItem(`${key}_${userName}`, JSON.stringify(merged));
      localStorage.removeItem(`${key}_guest`);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 mb-3 border rounded" required />
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full flex justify-center items-center px-3 py-2 mb-3 border rounded pr-16" required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-500">{showPassword ? "Hide" : "Show"}</button>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
        <p className="mt-4 text-sm text-center">Don’t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
      </form>
    </div>
  );
}

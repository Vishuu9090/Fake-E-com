import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  // Load logged-in user on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedUser && isLoggedIn === "true") {
      setUser(storedUser.name);
    }
  }, []);

  return (
    <Router>
      <Navbar search={search} setSearch={setSearch} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Products search={search} user={user} />} />
        <Route path="/wishlist" element={<Wishlist user={user} />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

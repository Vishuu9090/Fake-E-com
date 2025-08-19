import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ search, setSearch, user, setUser }) {
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "");

  const handleLogout = () => {
    // Reset guest cart & wishlist
    localStorage.removeItem("cart_guest");
    localStorage.removeItem("wishlist_guest");

    // Keep logged-in data saved automatically
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between flex-wrap gap-3">
      <h2 className="text-2xl font-bold">Fake E-Com</h2>

      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1 rounded-md text-black bg-white pr-10 w-[340px] sm:w-[450px]"
        />
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>

      <div className="flex gap-3 items-center">
        <Link to="/" className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200">
          Homepage 🏠
        </Link>

        {isLoggedIn ? (
          <>
            <div
              className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold"
              title={user}
            >
              {getInitial(user)}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200">
            Login 😊
          </Link>
        )}

        <Link to="/wishlist" className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200">
          Wishlist ❤️
        </Link>

        <Link to="/cart" className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200">
          Cart 🛒
        </Link>
      </div>
    </nav>
  );
}

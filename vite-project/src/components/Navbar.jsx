import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Navbar({ search, setSearch }) {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between flex-wrap gap-3">
      {/* Logo */}
      <h2 className="text-2xl font-bold">Fake E-Com</h2>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1 rounded-md text-black bg-white pr-10 sm:w-48  w-150"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 " />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200">
          Login😊
        </button>
        <button className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200">
          Wishlist ❤️
        </button>
        <button className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200">
          Cart 🛒
        </button>
      </div>
    </nav>
  );
}

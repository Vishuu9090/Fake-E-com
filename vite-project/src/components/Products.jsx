import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Products({ search }) {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
    });
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 grid gap-6 bg-gray-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="relative p-4 rounded-lg bg-white shadow hover:shadow-lg transition"
        >
          {/* Wishlist Icon */}
          <button
            className="absolute top-3 right-3 transition"
            onClick={() => toggleWishlist(product)}
          >
            <FaHeart
              size={20}
              className={
                wishlist.find((item) => item.id === product.id)
                  ? "text-red-500"
                  : "text-gray-400"
              }
            />
          </button>

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.title}
            className="h-40 mx-auto object-contain transition-transform duration-300 hover:scale-110"
          />

          <h3 className="mt-3 font-semibold text-lg line-clamp-1">
            {product.title}
          </h3>
          <p className="text-green-600 font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

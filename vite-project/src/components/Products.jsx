import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Products({ search }) {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]); // store wishlist product IDs

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId) // remove
        : [...prevWishlist, productId] // add
    );
  };

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
            onClick={() => toggleWishlist(product.id)}
          >
            <FaHeart
              size={20}
              className={
                wishlist.includes(product.id)
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

          {/* Product Details */}
          <h3 className="mt-3 font-semibold text-lg line-clamp-1">
            {product.title}
          </h3>
          <p className="text-green-600 font-bold">${product.price}</p>
          <button className="mt-2 bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-700">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

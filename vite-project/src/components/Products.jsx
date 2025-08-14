import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

export default function Products({ search }) {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // State for popup
  const [popup, setPopup] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Save wishlist & cart in localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
    });
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      // Always show popup, even if already in cart
      showPopup(
        exists
          ? `${product.title} is already in cart`
          : `${product.title} added to cart`
      );

      return exists ? prev : [...prev, product];
    });
  };

  // Show popup for 2 seconds
  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => {
      setPopup("");
    }, 3000);
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Popup Notification */}
      {popup && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {popup}
        </div>
      )}

      {/* Products Grid */}
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

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <FaCartPlus /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { FaHeart, FaCartPlus } from "react-icons/fa";

export default function Products({ search, user }) {
  const userKey = user ? user : "guest";
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem(`wishlist_${userKey}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(`cart_${userKey}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [popup, setPopup] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(`wishlist_${userKey}`, JSON.stringify(wishlist));
  }, [wishlist, userKey]);

  useEffect(() => {
    localStorage.setItem(`cart_${userKey}`, JSON.stringify(cart));
  }, [cart, userKey]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists ? prev.filter((i) => i.id !== product.id) : [...prev, product];
    });
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      showPopup(exists ? `${product.title} already in cart` : `${product.title} added to cart`);
      return exists ? prev : [...prev, { ...product, quantity: 1 }];
    });
  };

  const showPopup = (msg) => {
    setPopup(msg);
    setTimeout(() => setPopup(""), 2000);
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {popup && <div className="fixed z-1 bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg">{popup}</div>}
      <div className="p-6 grid gap-6 bg-gray-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="relative p-4 rounded-lg bg-white shadow hover:shadow-lg transition">
            <button className="absolute top-3 right-3" onClick={() => toggleWishlist(product)}>
              <FaHeart size={20} className={wishlist.find((i) => i.id === product.id) ? "text-red-500" : "text-gray-400"} />
            </button>
            <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain transition-transform duration-300 hover:scale-110" />
            <h3 className="mt-3 font-semibold text-lg line-clamp-1">{product.title}</h3>
            <p className="text-green-600 font-bold">${product.price}</p>
            <button onClick={() => addToCart(product)} className="mt-3 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded flex items-center gap-2">
              <FaCartPlus /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

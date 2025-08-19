import React, { useEffect, useState } from "react";
import { FaHeart, FaCartPlus } from "react-icons/fa";

export default function Products({ search, user }) {
  const isLoggedIn = !!user;
  const wishlistKey = isLoggedIn ? `wishlist_${user}` : "wishlist_guest";
  const cartKey = isLoggedIn ? `cart_${user}` : "cart_guest";

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem(wishlistKey)) || []);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem(cartKey)) || []);
  const [popup, setPopup] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => localStorage.setItem(wishlistKey, JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem(cartKey, JSON.stringify(cart)), [cart]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      showPopup(exists ? `${product.title} removed from wishlist` : `${product.title} added to wishlist`);
      return exists ? prev.filter(item => item.id !== product.id) : [...prev, product];
    });
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      showPopup(exists ? `${product.title} is already in cart` : `${product.title} added to cart`);
      return exists ? prev : [...prev, { ...product, quantity: 1 }];
    });
  };

  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(""), 3000);
  };

  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      {popup && <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">{popup}</div>}

      <div className="p-6 grid gap-6 bg-gray-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="relative p-4 rounded-lg bg-white shadow hover:shadow-lg transition">
            <button className="absolute top-3 right-3 transition" onClick={() => toggleWishlist(product)}>
              <FaHeart size={20} className={wishlist.find(item => item.id === product.id) ? "text-red-500" : "text-gray-400"} />
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

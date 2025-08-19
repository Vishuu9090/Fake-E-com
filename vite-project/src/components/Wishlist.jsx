import React, { useEffect, useState } from "react";

export default function Wishlist({ user }) {
  const userKey = user ? user : "guest";
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(`wishlist_${userKey}`);
    setWishlist(saved ? JSON.parse(saved) : []);
  }, [userKey]);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((i) => i.id !== id);
    setWishlist(updated);
    localStorage.setItem(`wishlist_${userKey}`, JSON.stringify(updated));
  };

  const moveToCart = (product) => {
    removeFromWishlist(product.id);
    const savedCart = JSON.parse(localStorage.getItem(`cart_${userKey}`)) || [];
    const exists = savedCart.some((i) => i.id === product.id);
    if (!exists) {
      localStorage.setItem(`cart_${userKey}`, JSON.stringify([...savedCart, { ...product, quantity: 1 }]));
    }
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? <p className="text-gray-500">Your wishlist is empty.</p> : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="relative p-4 rounded-lg bg-white shadow">
              <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain" />
              <h3 className="mt-3 font-semibold">{product.title}</h3>
              <p className="text-green-600 font-bold">${product.price}</p>
              <button className="absolute top-3 right-3 text-red-500" onClick={() => removeFromWishlist(product.id)}>Remove</button>
              <button className="absolute right-2 bottom-2 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded" onClick={() => moveToCart(product)}>Move to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

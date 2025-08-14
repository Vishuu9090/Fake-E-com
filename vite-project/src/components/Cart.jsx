import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white rounded shadow flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 object-contain"
              />
              <h3 className="mt-2 font-semibold text-center">{item.title}</h3>
              <p className="text-green-600 font-bold">${item.price}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

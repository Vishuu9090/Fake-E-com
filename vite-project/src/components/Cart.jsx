import React, { useEffect, useState } from "react";

export default function Cart({ user }) {
  const isLoggedIn = !!user;
  const cartKey = isLoggedIn ? `cart_${user}` : "cart_guest";

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(cartKey);
    setCart(saved ? JSON.parse(saved) : []);
  }, [cartKey]);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 0) }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white p-4 rounded-lg shadow"
              >
                <img src={item.image} alt={item.title} className="h-28 w-28 object-contain" />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-green-600 font-bold">
                    ${item.price} × {item.quantity || 1}
                  </p>
                  <p className="font-semibold">
                    = ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decreaseQty(item.id)} className="px-2 py-1 bg-gray-300 rounded">−</button>
                    <span className="px-3">{item.quantity || 1}</span>
                    <button onClick={() => increaseQty(item.id)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="mt-2 text-red-500 hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-lg shadow h-fit">
            <h3 className="text-lg font-semibold border-b pb-2">Price Details</h3>
            <div className="mt-2 space-y-2 text-gray-700">
              <p className="flex justify-between">
                <span>Price ({cart.length} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </p>
              <hr />
              <p className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>${totalPrice.toFixed(2)}</span>
              </p>
            </div>
            <button className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

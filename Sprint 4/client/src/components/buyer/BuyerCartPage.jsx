import React, { useEffect, useState } from "react";
import BillingModal from "./BillingModal";
import PaymentModal from "./PaymentModal";
import axios from "axios";
import { useNavigate } from "react-router";

const BuyerCartPage = () => {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/cart/all", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setCart(res.data.data.items);
        setCartId(res.data.data._id);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
      });
  }, []);
  const [showBillingModal, setShowBillingModal] = useState(false);

  const handlePurchase = async (id) => {
    setShowBillingModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5050/api/cart/remove/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    window.location.reload();
  };

  const navigate = useNavigate();
  console.log(cart);

  return (
    <div className="w-full p-6 mt-6 bg-white rounded-xl space-y-8">
      <BillingModal
        isOpen={showBillingModal}
        onClose={() => setShowBillingModal(false)}
        cartId={cartId}
      />
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Cart</h2>

      {cart === null || cart?.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart !== null &&
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm"
                >
                  <img
                    src={item.product.productImage}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="font-medium text-gray-800">
                      {item.product.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      ৳{item.quantityKg} x {item.quantity}
                    </span>
                    <span className="font-semibold text-green-700">
                      ৳{item.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleDelete(item.product._id)}
                      className="px-4 py-1.5 footnote bg-rose-800 text-white rounded-full "
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handlePurchase(item._id)}
                      className="px-8 py-1.5 footnote bg-green-800 text-white rounded-full "
                    >
                      Bid
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BuyerCartPage;

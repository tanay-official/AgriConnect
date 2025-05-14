import React, { useEffect, useState } from "react";
import axios from "axios";

const BuyerHomePage = () => {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: "", comment: "" });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/order/all",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const orders = response.data?.data || [];

        const formattedOrders = orders.map((order) => ({
          id: order._id,
          name: order.product.name,
          quantity: `${order.quantityKg}kg`,
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
          image: order.product.productImage,
        }));

        setOrderedProducts(formattedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleReviewSubmit = async (orderId) => {
    try {
      await axios.post(
        "http://localhost:5050/api/review/add",
        {
          orderId,
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert("Review submitted successfully!");
      setShowReviewForm(null);
      setReviewData({ rating: "", comment: "" });
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="w-full h-max p-6 mt-6 bg-white rounded-xl space-y-8">
      <section>
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Ordered Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orderedProducts.map((order) => (
            <div
              key={order.id}
              className="flex flex-col bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {order.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    {order.quantity}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Shipped"
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  className="text-sm text-blue-600 underline"
                  onClick={() =>
                    setShowReviewForm((prev) =>
                      prev === order.id ? null : order.id
                    )
                  }
                >
                  {showReviewForm === order.id ? "Cancel" : "Leave Review"}
                </button>

                {showReviewForm === order.id && (
                  <div className="mt-2 space-y-2">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      placeholder="Rating (1-5)"
                      className="border p-1 w-full rounded"
                      value={reviewData.rating}
                      onChange={(e) =>
                        setReviewData({
                          ...reviewData,
                          rating: e.target.value,
                        })
                      }
                    />
                    <textarea
                      placeholder="Write a comment..."
                      className="border p-1 w-full rounded"
                      value={reviewData.comment}
                      onChange={(e) =>
                        setReviewData({
                          ...reviewData,
                          comment: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={() => handleReviewSubmit(order.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Submit Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BuyerHomePage;

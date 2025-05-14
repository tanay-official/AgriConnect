import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";

const SingleProductCard = ({ product }) => {
  const { role, user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { name, productImage, pricePerKg, stock, owner, _id } = product;

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/review/all/${_id}`)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [_id]);

  const handleAddToCart = async () => {
    alert(`Added ${name} to cart!`);

    await axios
      .post(
        "http://localhost:5050/api/cart/add",
        {
          productId: _id,
          quantityKg: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("Product added to cart:", res.data);
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
      });
    setIsModalOpen(false);
  };

  const handleDeltereProduct = () => {
    axios
      .delete(`http://localhost:5050/api/product/delete/${_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
  };

  return (
    <>
      {/* Product Card */}
      <section
        className="w-full h-max pb-3 bg-white shadow-sm shadow-gray-300 rounded-lg relative cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={productImage}
          alt={name}
          className="object-cover w-full rounded-t-lg h-36"
        />

        <section className="pt-3 px-4">
          <div className="w-full flex justify-start items-start gap-2">
            <img
              src={owner?.profilePic}
              className="w-9 h-9 rounded-full object-cover"
              alt={owner?.firstname}
            />
            <div className="flex-1">
              <div className="w-full flex justify-between items-center gap-4">
                <Link
                  to={
                    role === "buyer"
                      ? `/buyer/${user.id}/messages/${owner?._id}`
                      : "/"
                  }
                  className="headline cursor-pointer hover:underline text-teal-800"
                >
                  {owner?.firstname} {owner?.lastname}
                </Link>
              </div>
              <p className="caption-one font-light">I grow {name}</p>
            </div>
          </div>
        </section>

        <section className="py-2.5 pl-4 flex justify-between items-center">
          <p className="body-two">
            <span className="font-medium text-green-950">{pricePerKg}</span>{" "}
            BDT/KGs
          </p>
          <p className="py-0.5 px-4 rounded-lg caption-one">
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </section>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-5 shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold text-green-900">
              {name} - {pricePerKg} BDT/KGs
            </h2>
            <img
              src={productImage}
              className="w-full h-40 object-cover rounded-lg mt-2"
              alt={name}
            />

            <p className="mt-2 text-sm text-gray-600">
              Farmer:{" "}
              <span className="text-teal-800 font-medium">
                {owner?.firstname} {owner?.lastname}
              </span>
            </p>

            <div className="mt-4">
              <h3 className="text-md font-medium mb-2">Reviews</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {reviews.length > 0 ? (
                  reviews.map((r, i) => (
                    <div key={i} className="text-sm border p-2 rounded">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">
                          {r.buyer.firstname + " " + r.buyer.lastname ||
                            "Anonymous"}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          {Array.from({ length: r.rating || 0 }).map((_, i) => (
                            <IoStarSharp key={i} className="w-3 h-3" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        {r.comment || "No comment"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No reviews yet.</p>
                )}
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-4 items-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm border border-rose-700 rounded-lg py-1.5 px-4 text-rose-700 cursor-pointer hover:text-gray-800"
              >
                Cancel
              </button>
              {role === "buyer" && (
                <button
                  onClick={handleAddToCart}
                  className="px-4 py-1.5 footnote bg-green-700 text-white text-sm rounded-lg cursor-pointer hover:bg-green-800"
                >
                  Add to Cart
                </button>
              )}
              {role === "farmer" && user.id === owner._id && (
                <button
                  onClick={handleDeltereProduct}
                  className="px-4 py-1.5 footnote bg-rose-700 text-white text-sm rounded-lg cursor-pointer hover:bg-rose-800"
                >
                  Delete Product
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductCard;

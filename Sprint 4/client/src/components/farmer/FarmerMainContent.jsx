import React, { useEffect, useState } from "react";
import ProductLists from "../homeFeed/ProductLists";
import SingleProductCard from "../homeFeed/SingleProductCard";
import ProductCreationModal from "./ProductCreationModal";
import { useSelector } from "react-redux";
import axios from "axios";

const FarmerMainContent = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/product/all")
      .then((res) => {
        console.log(res.data);
        setProducts(
          res.data.data.filter((product) => product.owner._id === user.id)
        );
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleProductSubmit = async (newProduct) => {
    const data = {
      name: newProduct.title,
      pricePerkg: newProduct.price,
      stock: newProduct.stock,
      productImage: newProduct.image,
      isAvailable: true, // Fixing the typo in 'isAvailable'
    };

    try {
      const response = await axios.post(
        "http://localhost:5050/api/product/create",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      window.location.reload();
      console.log("Product created successfully:", response.data);
      // Handle successful product creation (e.g., navigate, show success message)
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="flex-1 w-full bg-white pb-8 rounded-lg px-6 pt-4 mt-6">
      <div className="flex justify-between items-center gap-6 ">
        <h3 className="title-three">
          All Products <span>({products.length})</span>
        </h3>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="footnote bg-teal-800 font-medium text-white py-1.5 px-6 rounded-xl cursor-pointer"
        >
          Add new
        </button>
        <ProductCreationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleProductSubmit}
        />
      </div>
      {products.length === 0 && (
        <div className="w-full flex justify-center items-center mt-8">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
      <section className="w-full grid grid-cols-3 mt-6 gap-3 ">
        {products.map((product) => (
          <SingleProductCard key={product._id} product={product} />
        ))}
      </section>
    </div>
  );
};

export default FarmerMainContent;

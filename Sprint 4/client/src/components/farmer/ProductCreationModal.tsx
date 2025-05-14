import React, { useState } from "react";

const ProductCreationModal = ({ isOpen, onClose, onSubmit }) => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    onClose();
    setProduct({
      title: "",
      description: "",
      image: "",
      price: "",
      stock: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30  z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <h2 className="text-xl font-semibold text-teal-800 mb-4">
          Create New Product
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Product title"
            className="border rounded px-3 py-2"
            value={product.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Short description"
            className="border rounded px-3 py-2"
            value={product.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="border rounded px-3 py-2"
            value={product.image}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price per KG (BDT)"
            className="border rounded px-3 py-2"
            value={product.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock (KG)"
            className="border rounded px-3 py-2"
            value={product.stock}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-teal-800 text-white hover:bg-teal-900 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreationModal;

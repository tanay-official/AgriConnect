import React, { useEffect, useState } from "react";
import SingleProductCard from "./SingleProductCard";
import axios from "axios";

const ProductLists = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/product/all")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <section className="w-full grid grid-cols-4 mt-28 gap-4">
      {products.map((product) => (
        <SingleProductCard key={product._id} product={product} />
      ))}
    </section>
  );
};

export default ProductLists;

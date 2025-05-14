import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, pricePerkg, stock, isAvailable, productImage } = req.body;
    const owner = req.user;

    // Validate required fields
    if (!name || !pricePerkg || !stock || !productImage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (owner.role !== "farmer") {
      return res.status(403).json({ error: "Only Farmer can create products" });
    }
    // Create a new product
    const newProduct = new Product({
      owner,
      name,
      pricePerKg: pricePerkg,
      stock,
      isAvailable,
      productImage,
    });
    // Save the product to the database
    const savedProduct = await newProduct.save();
    // Send the saved product as a response
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate(
      "owner",
      "firstname lastname profilePic role"
    );
    res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this product" });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

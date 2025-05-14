import Cart from "../models/cart.model.js";

export const getAllCartProducts = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can access cart" });
    }

    const cart = await Cart.findOne({ buyer: userId })
      .populate("buyer", "firstname lastname email") // Optional: fetch buyer info
      .populate(
        "items.product",
        "name pricePerkg stock isAvailable productImage owner"
      ) // populate product fields
      .populate("items.product.owner", "firstname lastname profilePic role"); // deep populate owner

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Cart products fetched successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error fetching cart products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantityKg } = req.body;
    const user = req.user; // Assuming you have user object from the request
    const userId = req.user._id; // Assuming you have user ID from the request
    if (user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyer can add to cart" });
    }
    // Check if the product already exists in the cart
    const existingCart = await Cart.findOne({ buyer: userId });
    if (existingCart) {
      // If the product already exists, update the quantity
      const existingProductIndex = existingCart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (existingProductIndex !== -1) {
        existingCart.items[existingProductIndex].quantityKg += quantityKg;
      } else {
        // If the product doesn't exist, add it to the cart
        existingCart.items.push({ product: productId, quantityKg });
      }
      await existingCart.save();
    } else {
      // If the cart doesn't exist, create a new one
      const newCart = new Cart({
        buyer: userId,
        items: [{ product: productId, quantityKg }],
      });
      await newCart.save();
    }
    res.status(200).json({
      message: "Product added to cart successfully",
      data: { productId, quantityKg },
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { _id: userId, role } = req.user;

    if (role !== "buyer") {
      return res
        .status(403)
        .json({ message: "Only buyers can remove items from cart" });
    }

    const cart = await Cart.findOne({ buyer: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart successfully",
      data: { productId },
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

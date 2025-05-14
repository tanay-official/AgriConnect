import Order from "../models/order.model.js";
import Review from "../models/review.model.js";

export const createReviewByBuyer = async (req, res) => {
  try {
    const { orderId, comment, rating } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    if (userRole !== "buyer") {
      return res
        .status(403)
        .json({ message: "Only buyers can create reviews" });
    }

    // Find the order and validate ownership
    const order = await Order.findOne({ _id: orderId, buyer: userId }).populate(
      "product"
    );
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or access denied" });
    }

    // Check if the user already reviewed this product
    const existingReview = await Review.findOne({
      buyer: userId,
      product: order.product._id,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    // Create the review
    const newReview = new Review({
      buyer: userId,
      product: order.product._id,
      order: order._id,
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json({
      message: "Review submitted successfully",
      data: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReviewsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find all reviews for the given product
    const reviews = await Review.find({ product: productId }).populate(
      "buyer",
      "username profilePic firstname lastname"
    );
    // Calculate average rating (if using rating in Review schema)
    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((acc, review) => acc + (review.rating || 0), 0) /
          totalReviews
        : 0;

    res.status(200).json({
      message: "Reviews retrieved successfully",
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      reviews,
    });
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

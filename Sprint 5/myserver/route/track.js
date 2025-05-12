const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Track order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      order: {
        id: order._id,
        customer: order.customerDetails,
        items: order.items,
        total: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt
      }
    });
  } catch (err) {
    console.error('Track error:', err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Cancel order by ID
router.put('/cancel/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ success: false, message: "Order is already cancelled" });
    }

    order.status = 'Cancelled';
    await order.save();

    // Respond with same structure as GET
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order: {
        id: order._id,
        customer: order.customerDetails,
        items: order.items,
        total: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt
      }
    });
  } catch (err) {
    console.error('Cancel error:', err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;



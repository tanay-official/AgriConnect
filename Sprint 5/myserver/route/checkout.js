const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const { customerDetails, items, totalAmount } = req.body;

    console.log("👉 Incoming Order:", req.body);

    if (!items || !items.length) {
      return res.status(400).json({ message: 'Cart is empty!' });
    }

    const newOrder = new Order({
      customerDetails,
      items,
      totalAmount,
      paymentMethod: 'Cash on Delivery'
    });

    const saved = await newOrder.save();

    console.log("✅ Order Saved:", saved);

    res.status(201).json({
      message: 'Order placed successfully!',
      order: saved
    });
  } catch (error) {
    console.error('❌ Checkout error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

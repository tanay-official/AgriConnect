const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    if (!items.length) return res.status(400).json({ message: 'Cart is empty!' });

    const newOrder = new Order({ userId, items, totalAmount });
    await newOrder.save();

    res.status(200).json({ message: 'Order placed successfully!', orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

module.exports = router;


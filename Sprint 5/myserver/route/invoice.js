const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ 
        success: false,
        message: 'Order not found' 
      });
    }

    let invoiceText = `INVOICE #${order._id}\n`;
    invoiceText += `Date: ${order.createdAt.toLocaleString()}\n\n`;
    invoiceText += `CUSTOMER DETAILS:\n`;
    invoiceText += `Name: ${order.customerDetails.name}\n`;
    invoiceText += `Phone: ${order.customerDetails.phone}\n`;
    invoiceText += `Address: ${order.customerDetails.address}\n\n`;
    invoiceText += `ITEMS:\n`;

    order.items.forEach(item => {
      invoiceText += `${item.name} - ${item.quantity} x ৳${item.price} = ৳${item.price * item.quantity}\n`;
    });

    invoiceText += `\nTOTAL: ৳${order.totalAmount}\n`;
    invoiceText += `Payment Method: ${order.paymentMethod}\n`;
    invoiceText += `Status: ${order.status}`;

    res.setHeader('Content-Disposition', `attachment; filename=invoice-${order._id}.txt`);
    res.setHeader('Content-Type', 'text/plain');
    res.send(invoiceText);
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
});

module.exports = router;


const express = require('express');
const PDFDocument = require('pdfkit');
const Order = require('../models/Order'); // path may vary

const router = express.Router();

router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) return res.status(404).send('Order not found');

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(20).text('INVOICE', { align: 'center' }).moveDown();
    doc.fontSize(12).text(`Customer Name: ${order.user.name}`);
    doc.text(`Email: ${order.user.email}`);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`);
    doc.moveDown();

    doc.fontSize(14).text('Items:', { underline: true });
    order.items.forEach((item, index) => {
      doc.fontSize(12).text(`${index + 1}. ${item.name} x ${item.quantity} - $${item.price}`);
    });

    doc.moveDown().fontSize(14).text(`Total: $${order.total}`);
    doc.end();

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;


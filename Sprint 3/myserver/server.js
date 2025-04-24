const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const checkoutRoute = require('./routes/checkout');
const invoiceRoute = require('./routes/invoice'); // <-- ✅ New

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Connected");
}).catch(err => console.error(err));

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.use('/api/checkout', checkoutRoute);
app.use('/api/invoice', invoiceRoute); // <-- ✅ New

app.listen(5000, () => {
  console.log('Server started on port 5000');
});



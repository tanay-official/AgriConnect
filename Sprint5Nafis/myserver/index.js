const express = require('express'); 
const cors = require("cors");
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express(); 
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MongoDB native URI (for products)
const nativeUri = "mongodb+srv://tanaydatamanage:sLX5FQjfHBYJjFeR@cluster0.wnhuhwg.mongodb.net/?appName=Cluster0";

// Mongoose URI (for orders, invoices)
const mongooseUri = "mongodb://127.0.0.1:27017/agriconnect"; // or use Atlas if you prefer

// Mongoose connection
mongoose.connect(mongooseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Mongoose connected to agriconnect');
}).catch((err) => {
  console.error('❌ Mongoose connection error:', err);
});

// Load Mongoose order routes
app.use('/api/checkout', require('./route/checkout'));
app.use('/api/invoice', require('./route/invoice'));
app.use('/api/track', require('./route/track'));


// Connect native MongoDB (for products)
const client = new MongoClient(nativeUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const database = client.db("agriconnect");
    const productCollection = database.collection("products");

    // GET all products
    app.get('/products', async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // POST a new product
    app.post("/products", async (req, res) => {
      const product = req.body;
      console.log("New product received:", product);
      const result = await productCollection.insertOne(product);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("✅ Native MongoDB connected (products)");

  } catch (error) {
    console.error("❌ Native MongoDB error:", error);
  }
}
run().catch(console.dir);

// Test Route
app.get('/', (req, res) => {
  res.send("Server running correctly with products, checkout, and invoice");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

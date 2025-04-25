const express = require('express'); 
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require('mongodb');
//import korlam 
const port = process.env.PORT || 3001;

const app = express(); 

// bGffEOQLTKPLo6Tq
// amiarman932

app.use(cors());
app.use(express.json());



//const uri = "mongodb+srv://amiarman932:bGffEOQLTKPLo6Tq@userone.2rb28mx.mongodb.net/?retryWrites=true&w=majority&appName=userOne";
//sLX5FQjfHBYJjFeR
//tanaydatamanage
const uri = "mongodb+srv://tanaydatamanage:sLX5FQjfHBYJjFeR@cluster0.wnhuhwg.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("agriconnect"); //create database 
    const productCollection = database.collection("products");

    app.get('/products' , async(req,res) =>{
        const cursor  = productCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.post("/products" , async(req,res) =>{
        const product = req.body;
        console.log("new product ", product);
        const result = await productCollection.insertOne(product);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res)=>{
    res.send("server runing correctly")
})

app.listen(port, ()=>{
    console.log(`server runing in port:  ${port}`)
})
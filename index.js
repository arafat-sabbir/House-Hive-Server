const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t245pno.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("EchoState").collection("users");
    const reviewCollection = client.db("EchoState").collection("reviews");
    const propertiesCollection = client
      .db("EchoState")
      .collection("Properties");

    // get the current user data
    app.get("/api/getuser", async (req, res) => {
      const useremail = req.query.email;
      const query = { email: useremail };
      const result = await userCollection.findOne(query);
      res.send(result);
    });
    // get all the properties
    app.get("/api/getProperties", async (req, res) => {
      const result = await propertiesCollection.find().toArray();
      res.send(result)
    });
    // get singleProduct
    app.get('/api/detailProperty/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id:new ObjectId(id)}
      const result = await propertiesCollection.findOne(query)
      res.send(result)
    })
    // create user
    app.post("/api/users", async (req, res) => {
      try {
        const userData = req.body;
        console.log(userData);
        const email = req.query.email;
        const query = { email: email };
        const existUser = await userCollection.findOne(query);
        if (existUser) {
          return res.send({ message: "user Already Exist" });
        }
        console.log(req.body);
        const result = await userCollection.insertOne(userData);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    // Create Review 
    app.post('/api/addReview',async(req,res)=>{
      const review = req.body;
      const result = await reviewCollection.insertOne(data)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // lkasjdklfj
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Bistro Boss Is Setting!");
});

app.listen(port, () => {
  console.log(`Bistro Boss Eating In Port ${port}`);
});

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://echo-state.web.app",
      "https://cute-hotteok-edc7ca.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
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
    // await client.connect();

    const userCollection = client.db("EchoState").collection("users");
    const reviewCollection = client.db("EchoState").collection("reviews");
    const offersCollection = client.db("EchoState").collection("offers");
    const wishCollection = client.db("EchoState").collection("wish");
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
    // Get all the user data for admin
    app.get("/api/getallUsers", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // get single review for user my review
    app.get("/api/getUserReview", async (req, res) => {
      const email = req.query.email;
      const query = { reviewerEmail: email };
      const result = await reviewCollection.find(query).toArray();
      res.send(result);
    });
    // Get all the review data for admin
    app.get("/api/getallReviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });
    // get all the properties
    app.get("/api/getProperties", async (req, res) => {
      const result = await propertiesCollection.find().toArray();
      res.send(result);
    });
// get the properties that are verified
    app.get("/api/getVerifiedProperties", async (req, res) => {
      const query = {propertyVerificationStatus:"verified"}
      const result = await propertiesCollection.find(query).toArray();
      res.send(result);
    });
    // get single properties with agent email
    app.get("/api/getProperty", async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const query = { agentEmail: email };
      const result = await propertiesCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    });
    // get singleProduct
    app.get("/api/detailProperty/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await propertiesCollection.findOne(query);
      res.send(result);
    });
    // get wishlist for logged in user
    app.get("/api/getWishlist", async (req, res) => {
      const email = req.query.email;
      const query = { wishedEmail: email };
      const result = await wishCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/api/getWish/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishCollection.findOne(query);
      res.send(result);
    });
    // Ger Property Bought for user
    app.get("/api/getboughtProperty", async (req, res) => {
      const email = req.query.email;
      const query = { buyerEmail: email };
      const result = await offersCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/api/getRequestedProperty", async (req, res) => {
      const email = req.query.email;
      const query = { agentEmail: email };
      const result = await offersCollection.find(query).toArray();
      res.send(result);
    });
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
    // Add to use WishList
    app.post("/api/addToWishlist", async (req, res) => {
      const wishlist = req.body;
      const result = await wishCollection.insertOne(wishlist);
      res.send(result);
      console.log(wishlist, result);
    });
    // add offer to offercollection
    app.post("/api/addOffer", async (req, res) => {
      const offer = req.body;
      const result = await offersCollection.insertOne(offer);
      res.send(result);
    });
    // Create Review
    app.post("/api/addReview", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });
    // Add Property by agent
    app.post("/api/addProperty", async (req, res) => {
      const propertyDetail = req.body;
      const result = await propertiesCollection.insertOne(propertyDetail);
      res.send(result);
    });
    // change user role based on admin request
    app.patch("/api/changeRole/:id", async (req, res) => {
      const id = req.params.id;
      const newrole = req.query.role;
      console.log(newrole);
      const query = { _id: new ObjectId(id) };
      const updatedRole = {
        $set: {
          role: newrole,
        },
      };
      const result = await userCollection.updateOne(query, updatedRole);
      res.send(result);
    });
    // mark a agent as fraud and delete all the data of that agent from database
    app.patch("/api/makeFraud/:id", async (req, res) => {
      const id = req.params.id;
      const newrole = req.query.role;
      const email = req.query.email;
      console.log(newrole);
      const query = { _id: new ObjectId(id) };
      const updatedRole = {
        $set: {
          role: newrole,
        },
      };
      const filter = {agentEmail: email};
      const result = await userCollection.updateOne(query, updatedRole);
      const result2 = await propertiesCollection.deleteMany(filter)
      res.send(result);
    });
    // update agent Property
    app.patch("/api/updateProperty/:id", async (req, res) => {
      const updatedData = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          propertyImage: updatedData.propertyImage,
          propertyTitle: updatedData.propertyTitle,
          propertyLocation: updatedData.propertyLocation,
          propertyPriceRange: updatedData.propertyPriceRange,
        },
      };
      const result = await propertiesCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // update a verification status based on admin response 

    // delete agent property
    app.delete("/api/delete-property/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await propertiesCollection.deleteOne(query);
      res.send(result);
    });
    // delete a specific wish
    app.delete("/api/delete-wish/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishCollection.deleteOne(query);
      res.send(result);
    });
    // delete a specific review
    app.delete("/api/delete-review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });
    // deleting a specific user
    app.delete("/api/delete-User/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
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

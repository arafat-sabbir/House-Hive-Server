const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
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

const tokenVerify = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized Access Request" });
  }
  const token = req?.headers?.authorization?.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Unauthorized access Detected" });
    }
    req.user = decoded;
    next();
  });
};

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
    app.get("/api/getallUsers", tokenVerify, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // get single review for user my review
    app.get("/api/getUserReview", tokenVerify, async (req, res) => {
      const email = req.query.email;
      const query = { reviewerEmail: email };
      const result = await reviewCollection.find(query).toArray();
      res.send(result);
    });
    // Get all the review data for admin
    app.get("/api/getallReviews", tokenVerify, async (req, res) => {
      let sort = {};
      sort["reviewDate"] = "desc";
      const result = await reviewCollection.find().sort(sort).toArray();
      res.send(result);
    });
    // get all the properties
    app.get("/api/getProperties", async (req, res) => {
      const result = await propertiesCollection.find().toArray();
      res.send(result);
    });
    // get the properties that are verified
    app.get("/api/getVerifiedProperties", async (req, res) => {
      const filter = req.query;

      const searchText = filter?.search || "";
      console.log(filter);
      const priceSort = filter?.priceSort || "";
      const priceRange = filter?.priceRange || "";
      const query = {
        propertyVerificationStatus: "verified",
      };
      if (searchText !== "Search By Property Title") {
        query.propertyTitle = { $regex: searchText, $options: "i" };
      }

      if (priceRange !== "All") {
        if (priceRange !== "900000-Above") {
          const minPrice = parseInt(priceRange?.split("-")[0]) || 0;
          const maxPrice = parseInt(priceRange?.split("-")[1]) || 0;
          query.minPrice = { $gte: minPrice };
          query.maxPrice = { $lte: maxPrice };
          console.log(priceRange);
        } else if (priceRange == "900000-Above") {
          const minPrice = parseInt(priceRange?.split("-")[0]) || 0;
          query.minPrice = { $gte: minPrice };
        }
      }

      const sort = {};
      if (priceSort !== "All") {
        sort["minPrice"] = priceSort;
      }
      const result = await propertiesCollection
        .find(query)
        .sort(sort)
        .toArray();
      res.send(result);
    });

    // get single properties with agent email
    app.get("/api/getProperty", tokenVerify, async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const query = { agentEmail: email };
      const result = await propertiesCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    });
    // get signleProperty
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
    // get wishlist for make an offer
    app.get("/api/getWish/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishCollection.findOne(query);
      res.send(result);
    });
    // Ger Property Bought for user
    app.get("/api/getboughtProperty", tokenVerify, async (req, res) => {
      const email = req.query.email;
      const query = { buyerEmail: email };
      const result = await offersCollection.find(query).toArray();
      res.send(result);
    });
    // get requested property for agent
    app.get("/api/getRequestedProperty", tokenVerify, async (req, res) => {
      const email = req.query.email;
      const query = { agentEmail: email };
      const result = await offersCollection.find(query).toArray();
      res.send(result);
    });
    // Get a specific offer data for Payment
    app.get("/api/getOfferData/:id", tokenVerify, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await offersCollection.findOne(query);
      res.send(result);
    });
    // Get sold properties for agent
    app.get("/api/getSoldProperties", tokenVerify, async (req, res) => {
      const email = req.query.email;
      const query = {
        agentEmail: email,
        payment: "completed",
      };
      const result = await offersCollection.find(query).toArray();
      res.send(result);
    });
    // Get verified Property for advertise
    app.get("/api/getVerifiedProperty", tokenVerify, async (req, res) => {
      const query = { propertyVerificationStatus: "verified" };
      const result = await propertiesCollection.find(query).toArray();
      res.send(result);
    });
    // Get advertise Property for advertise home section
    app.get("/api/getAdvertiseProperty", async (req, res) => {
      const query = { advertiseStatus: "advertise" };
      const result = await propertiesCollection.find(query).toArray();
      res.send(result);
    });
    // Get the Agent Detail For Agent Detail Page
    app.get("/api/getAgentData/:email", async (req, res) => {
      const email = req.params.email;
      const query = {
        email: email,
      };
      const result = await userCollection.findOne(query);
      res.send(result);
    });
    app.patch("/api/agentRequest/:id", async (req, res) => {
      const agentInfo = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const agentReq = {
        $set: {
          agentReq: "true",
          whatsapp: agentInfo.whatsapp,
          linkedin: agentInfo.linkedin,
          twitter: agentInfo.twitter,
          facebook: agentInfo.facebook,
        },
      };
      const result = await userCollection.updateOne(query, agentReq, options);
      res.send(result);
    });

    app.get("/api/agentReq", async (req, res) => {
      const query = { agentReq: "true", role: "user" };
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });
    // Get review for specific property
    app.get("/api/getpropertyReview", tokenVerify, async (req, res) => {
      const id = req.query.propertyId;
      console.log(id);
      const query = { propertyId: id };
      const result = await reviewCollection.find(query).toArray();
      res.send(result);
    });
    // make a token for successfully user login
    app.post("/api/user/accessToken", async (req, res) => {
      try {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1h",
        });
        console.log(req.body, token);
        res.send({ token });
      } catch (error) {
        console.log(error);
      }
    });
    // Create Payment Intenet For User Pay
    app.post("/api/createPaymentIntent", tokenVerify, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
    // update offer status
    app.patch("/api/updateOfferStatus/:id", tokenVerify, async (req, res) => {
      const updatedData = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateStatus = {
        $set: {
          offerStatus: updatedData.status,
          transactionId: updatedData.transactionId,
          payment: updatedData.payment,
        },
      };
      const result = await offersCollection.updateOne(
        query,
        updateStatus,
        options
      );
      res.send(result);
    });
    // create user
    app.post("/api/users", async (req, res) => {
      try {
        const userData = req.body;
        const email = req.query.email;
        const query = { email: email };
        const existUser = await userCollection.findOne(query);
        if (existUser) {
          return res.send({ message: "user Already Exist" });
        }
        const result = await userCollection.insertOne(userData);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    // Add to use WishList
    app.post("/api/addToWishlist", tokenVerify, async (req, res) => {
      const wishlist = req.body;
      const result = await wishCollection.insertOne(wishlist);
      res.send(result);
    });
    // add offer to offercollection
    app.post("/api/addOffer", tokenVerify, async (req, res) => {
      const offer = req.body;
      const result = await offersCollection.insertOne(offer);
      res.send(result);
    });
    // Create Review
    app.post("/api/addReview", tokenVerify, async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });
    // Add Property by agent
    app.post("/api/addProperty", tokenVerify, async (req, res) => {
      const propertyDetail = req.body;
      const result = await propertiesCollection.insertOne(propertyDetail);
      res.send(result);
    });
    // change user role based on admin request
    app.patch("/api/changeRole/:id", tokenVerify, async (req, res) => {
      const id = req.params.id;
      const newrole = req.query.role;
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
    app.patch("/api/makeFraud/:id", tokenVerify, async (req, res) => {
      const id = req.params.id;
      const newrole = req.query.role;
      const email = req.query.email;
      const query = { _id: new ObjectId(id) };
      const updatedRole = {
        $set: {
          role: newrole,
        },
      };
      const filter = { agentEmail: email };
      const result = await userCollection.updateOne(query, updatedRole);
      const result2 = await propertiesCollection.deleteMany(filter);
      res.send(result);
    });
    // Update the Property Verification status Based On admin Action
    app.patch("/api/updateStatus/:id", tokenVerify, async (req, res) => {
      const status = req.query.status;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateStatus = {
        $set: {
          propertyVerificationStatus: status,
        },
      };
      const result = await propertiesCollection.updateOne(query, updateStatus);
      res.send(result);
    });
    app.patch("/api/updateAdvertise/:id", tokenVerify, async (req, res) => {
      const status = req.query.advertiseStatus;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateStatus = {
        $set: {
          advertiseStatus: status,
        },
      };
      const result = await propertiesCollection.updateOne(
        query,
        updateStatus,
        options
      );
      res.send(result);
    });
    // Update a OfferStatus For agent
    app.patch("/api/updateOffer/:id", tokenVerify, async (req, res) => {
      const status = req.query.status;
      const propertyId = req.query.propertyId;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const acceptOne = {
        $set: {
          offerStatus: status,
        },
      };
      const filter = {
        _id: { $ne: new ObjectId(id) },
        propertyId: propertyId,
      };
      const rejectOther = {
        $set: {
          offerStatus: "rejected",
        },
      };
      const result = await offersCollection.updateOne(query, acceptOne);
      const result2 = await offersCollection.updateMany(filter, rejectOther);
      res.send(result);
    });
    // update agent Property
    app.patch("/api/updateProperty/:id", tokenVerify, async (req, res) => {
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
    app.delete("/api/delete-property/:id", tokenVerify, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await propertiesCollection.deleteOne(query);
      res.send(result);
    });
    // delete a specific wish
    app.delete("/api/delete-wish/:id", tokenVerify, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishCollection.deleteOne(query);
      res.send(result);
    });
    // delete a specific review
    app.delete("/api/delete-review/:id", tokenVerify, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });
    // deleting a specific user
    app.delete("/api/delete-User/:id", tokenVerify, async (req, res) => {
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
  res.send("Echo Estate Is Building Property!");
});

app.listen(port, () => {
  console.log(`Echo Estate Is Building Property At ${port}`);
});

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = 3002;

// create product schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },

  price: Number,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create product model

const Product = mongoose.model("Products", productSchema);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017");
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
    console.log(error);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to our home page ");
});

// create route

app.post("/products", async(req, res) => {
  try {
   
    const newProduct=new Product({
        title:req.body.title,
        price:req.body.price,
        description:req.body.description

    });

    const newData= await Product.insertMany([
        {
            title:"iphone 5",
            price:70,
            description:"beautiful phone"
        },
        {
            title:"iphone 6",
            price:60,
            description:"beautiful phone"
        },
        {
            title:"iphone 4",
            price:30,
            description:"beautiful phone"
        },
        {
            title:"iphone 10",
            price:700,
            description:"beautiful phone"
        },
    ])


    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.listen(port, async () => {
  console.log(`server is running at http://localhost:${port}`);
  await connectDB();
});

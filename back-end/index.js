const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let ids = new Set(); // Set to store catalog IDs

// MongoDB connection string
const uri = "mongodb+srv://dbUser2:Abcd333@cluster0.rk5ybk0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create an instance of Express
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Successfully connected to MongoDB using Mongoose"))
.catch(err => console.log("MongoDB connection error: ", err));

// Define a Mongoose schema and model
const itemSchema = new mongoose.Schema({
  catalog_id: Number,
  metadata: String,
});

const Item = mongoose.model('Item', itemSchema);

// Route to insert data
app.post('/', async (req, res) => {
  try {
    // Check if the catalog ID is already added
    if (ids.has(req.body.catalog_id)) {
      return res.status(400).send("Already added to list");
    }

    // Create a new item and save it to the database
    const newItem = new Item({
      catalog_id: req.body.catalog_id,
      metadata: req.body.metadata
    });
    
    // Add catalog_id to the Set to keep track
    ids.add(req.body.catalog_id);
    
    await newItem.save();
    res.status(201).send(newItem);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Route to get all items
app.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to delete an item by ID
app.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).send('Item not found');
    }
    res.status(200).send(deletedItem);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

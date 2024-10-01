const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an instance of Express
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/anime_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Define a Mongoose schema and model
const itemSchema = new mongoose.Schema({
  catalog_id: Number,
  metadata: String,
});

const Item = mongoose.model('Item', itemSchema);

// Route to insert data
app.post('/', async (req, res) => {
  try {
    const newItem = new Item({
      catalog_id: req.body.catalog_id,
      metadata: req.body.metadata
    });
    await newItem.save();
    res.status(201).send(newItem);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
app.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Route to delete data
app.delete('/', async (req, res) => {
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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

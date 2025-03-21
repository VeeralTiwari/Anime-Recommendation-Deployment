const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

let db;
const app = express();

// CORS Configuration
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE'
}));
app.use(express.json());

// MongoDB Connection URI
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connected to MongoDB");

  db = mongoose.connection; // Assign the database reference to the global variable

  // Example: Listening for errors after connection
  db.on("error", err => console.error("MongoDB Error:", err));
})
.catch(err => console.log("MongoDB connection error:", err));

const similarAnimes = mongoose.connection.collection("similar_animes_collection");


// Item Schema
const itemSchema = new mongoose.Schema({
  catalog_id: { type: Number, required: true },
  metadata: { type: String, required: true }
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  items: [itemSchema] // Embedded items directly in the user schema
});
const storeSchema = new mongoose.Schema({
  userId : {type: String, required: true}
});

const User = mongoose.model('User', userSchema);
const Store = mongoose.model('sessions', storeSchema);


// Sign Up Route
app.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ msg: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    
    const store = await Store.findById(process.env.Storeid);
    if(!store){
      console.log("not found");
    }
    store.userId = newUser._id;
    await store.save(); 
      res.status(201).send({ userId: newUser._id, msg: 'User created successfully' });
  } catch (error) {
    console.error('Error in signup route:', error);
    res.status(500).send({ msg: 'Server error', error: error.message });
  }
});

// Login Route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: 'Invalid password' });
    }
    const store = await Store.findById(process.env.Storeid);
    if(!store){
      console.log("not found");
    }
    store.userId = user._id;
    await store.save();
      res.status(200).send({ userId: store.userId, msg: 'User login successful' });
  
  } catch (error) {
    console.error('Error in login route:', error);
    res.status(500).send({ msg: 'Server error', error: error.message });
  }
});

// Insert Item Route
app.post('/insert', async (req, res) => {
  const { userId, catalog_id, metadata } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if(user.items.findOne({catalog_id})){
      return res.status(404).json({ msg: 'Item exist in your list' });
    }
    const newItem = { catalog_id, metadata };
    user.items.push(newItem);
    await user.save();
    res.status(201).json({ msg: 'Item successfully added' });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ msg: 'Error adding item', error: error.message });
  }
});

// Get User Items Route
app.post('/get-list', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user.items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ msg: 'Error fetching items', error: error.message });
  }
});

//GET SIMILAR ANIMES LIST
app.post('/get-similar', async(req, res)=>{
  const {mal_id} = req.body;
  try {
    const anime = await similarAnimes.findOne({mal_id});
    if (!anime) {
      return res.status(404).json({ msg: 'anime not found' });
    }
    res.status(200).json(anime.similar_animes);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ msg: 'Error fetching similar anime items', error: error.message });
  }
});

app.get('/get-env', async (req, res) => {
  console.log(process.env.Storeid);
  const store = await Store.findById(process.env.Storeid);
  if(!store){
    return res.status(500).json({msg: "user not found"});
  }
  const id = store.userId;
  res.status(200).json({ msg: "User is logged in", userId: id });
});

app.post('/get-env', async (req, res) => {
  console.log(process.env.Storeid);
  const store = await Store.findById(process.env.Storeid);
  if(!store){
    return res.status(500).json({msg: "user not found"});
  }
  store.userId = 'guest';
  await store.save();
  res.status(200).json({ msg: "User is logged out", userId: store.userId });
});

// Test Route
app.get('/', (req, res) => {
  res.status(200).json({msg : 'server is running'});
});
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

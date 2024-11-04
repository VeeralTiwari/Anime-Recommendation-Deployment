const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: '*', // Replace with your client's domain
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
.then(() => console.log("Successfully connected to MongoDB"))
.catch(err => console.log("MongoDB connection error: ", err));

// Item Schema
const itemSchema = new mongoose.Schema({
  catalog_id: { type: Number, required: true },
  metadata: { type: String, required: true }
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  items: [itemSchema] // Embedded items directly in the user schema
});

const User = mongoose.model('User', userSchema);

const envPath = path.resolve(__dirname, '.env');
let envConfig = fs.readFileSync(envPath, 'utf8');

// Function to update .env variable
function updateEnvVariable(key, value) {
  const regex = new RegExp(`^${key}=.*`, 'm');
  const newVariable = `${key}=${value}`;

  if (envConfig.match(regex)) {
    // Replace existing variable
    envConfig = envConfig.replace(regex, newVariable);
  } else {
    // Add new variable if it doesn't exist
    envConfig += `\n${newVariable}`;
  }

  fs.writeFileSync(envPath, envConfig);
}

// Sign Up Route
app.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).send({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    updateEnvVariable('userId', newUser._id);
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
    updateEnvVariable('userId', user._id);

    res.status(200).send({ userId: user._id, msg: 'User login successful' });
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
    const user = await User.findById(userId );
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json(user.items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ msg: 'Error fetching items', error: error.message });
  }
});

// Delete Item Route
app.delete('/insert/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ "items._id": id });
    if (!user) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    user.items.id(id).remove();
    await user.save();

    res.status(200).json({ msg: 'Item successfully deleted' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ msg: 'Error deleting item', error: error.message });
  }
});

app.get('/get-env', (req, res) => {
  res.json({ userId: process.env.userId});
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

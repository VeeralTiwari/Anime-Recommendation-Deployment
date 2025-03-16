const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: '*', // Replace with your client's domain
  methods: 'GET, POST, PUT, DELETE'
}));
app.use(express.json());

// MongoDB Connection URI
const uri = 'mongodb+srv://dbUser2:Abcd333@cluster0.rk5ybk0.mongodb.net/mydatabase?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Successfully connected to MongoDB"))
.catch(err => console.log("MongoDB connection error: ", err));

//Schema
const similarAnimeSchema = new mongoose.Schema({
    mal_id: { type: Number, required: true, unique: true, index: true }, // Indexed & unique
    similar_animes: [
        {
            mal_id: Number,   
            similarity_score: Number 
        }
    ]
}, { collection: "similar_animes_collection" });


const animeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    mal_id: {type : Number, required :true, unique: true, index: true},
    genres: { type: [String], required: true }, // List of genres
    studios: { type: [String], required: true }, // List of studios
    popularity: { type: Number, required: true }, // Popularity score
    demographics: { type: [String], required: false }, // E.g., Shounen, Seinen, Josei
    format: { type: String, required: true } // E.g., TV, Movie, OVA
}, { collection: "anime_features_table" });

//Model
const SimilarAnime = mongoose.model("SimilarAnime", similarAnimeSchema);
const Anime = mongoose.model("Anime", animeSchema);


app.post('/', async (req, res) => {
    try {
        const { title, mal_id, genres, studios, popularity, demographics, format } = req.body;

        // Validate required fields
        if (!title || !(mal_id) || !genres || !studios || !format) {
            return res.status(400).json({ missing: true, message: "Missing required fields" });
        }

        // Check if anime already exists in the database (to prevent duplicates)
        const existingAnime = await Anime.findOne({ mal_id });
        if (existingAnime) {
            return res.status(409).json({ message: "Anime already exists" });
        }

        // Create a new anime document
        const newAnime = new Anime({
            title,
            mal_id,
            genres,
            studios,
            popularity: popularity || 0,  // Default value if not provided
            demographics: demographics || [],  // Ensure it's an array
            format
        });

        // Save to the database
        await newAnime.save();
        res.status(201).json({ message: "Anime added successfully!", anime: newAnime });

    } catch (error) {
        console.error("Error adding anime:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


const PORT = 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
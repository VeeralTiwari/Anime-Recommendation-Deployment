import numpy as np
import pymongo
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer, MinMaxScaler

# MongoDB Connection
MONGO_URI = "mongodb+srv://dbUser2:Abcd333@cluster0.rk5ybk0.mongodb.net/mydatabase?retryWrites=true&w=majority"
client = pymongo.MongoClient(MONGO_URI)
db = client["mydatabase"]
collection = db["anime_features_table"]
similar_animes_collection = db["similar_animes_collection"]

def fetch_anime_data():
    """Fetch all anime data from the database, including demographics."""
    animes = list(collection.find({}, {
        "_id": 0, 
        "mal_id": 1, 
        "genres": 1, 
        "studios": 1, 
        "popularity": 1, 
        "format": 1,
        "demographics": 1  # Include demographics
    }))
    print(animes, "\n", "\n")
    return animes

def convert_to_vectors(anime_list):
    """Convert anime data to feature vectors including demographics."""
    genres = [anime['genres'] for anime in anime_list]
    studios = [anime['studios'] for anime in anime_list]
    
    # Ensure 'format' is treated as a list
    formats = [anime['format'] if isinstance(anime['format'], list) else [anime['format']] for anime in anime_list]
    
    demographics = [anime['demographics'] for anime in anime_list]

    # Normalize popularity
    popularity = np.array([anime['popularity'] for anime in anime_list]).reshape(-1, 1)
    scaler = MinMaxScaler()
    popularity_normalized = scaler.fit_transform(popularity)

    # One-hot encode categorical features
    mlb = MultiLabelBinarizer()
    genre_matrix = mlb.fit_transform(genres)    
    studio_matrix = mlb.fit_transform(studios)
    format_matrix = mlb.fit_transform(formats)
    demographics_matrix = mlb.fit_transform(demographics)

    # Combine all feature matrices
    feature_matrix = np.hstack([genre_matrix, studio_matrix, format_matrix, demographics_matrix, popularity_normalized])
    
    print(feature_matrix, "\n", "\n")
    return feature_matrix

def compute_similarity(anime_list, feature_matrix):
    """Compute cosine similarity between all animes and store top 50 similar animes in a new collection."""
    similarity_matrix = cosine_similarity(feature_matrix)
    print(similarity_matrix, "\n", "\n")

    similarity_data = []  # Store bulk insert data

    for i in range(len(anime_list)):
        anime_id = anime_list[i]['mal_id']
        similar_animes = []

        for j in range(len(anime_list)):
            if i != j:  # Exclude self-comparison
                similar_animes.append({
                    "mal_id": anime_list[j]['mal_id'], 
                    "similarity": float(similarity_matrix[i][j])
                })

        # ✅ Keep only the **top 50 most similar** animes
        similar_animes = sorted(similar_animes, key=lambda x: x["similarity"], reverse=True)[:50]

        # ✅ Add to bulk insert list
        similarity_data.append({
            "mal_id": anime_id,
            "similar_animes": similar_animes
        })
    print(similarity_data, "\n", "\n")
    # ✅ Bulk insert to avoid multiple DB writes
    similar_animes_collection.insert_many(similarity_data)


def main():
    """Fetch, convert, compute similarity, and store results."""
    anime_list = fetch_anime_data()
    feature_matrix = convert_to_vectors(anime_list)
    compute_similarity(anime_list, feature_matrix)
    print("Similarity computation completed and stored in DB.")

if __name__ == "__main__":
    main()


# Anime Recommendation App

This repository contains an Anime Recommendation App built with HTML, CSS, JavaScript for the frontend, and Node.js, Express, MySQL for the backend. The app utilizes the Jikan API to fetch anime data and a Python script to extract unique anime IDs from MyAnimeList website.

## Snapshots
![Screenshot 2024-09-16 232219](https://github.com/user-attachments/assets/09713d41-4b48-42b2-b40c-0d92dbacc6df)

## Features

- Browse and search for anime recommendations
- Fetch anime data from the Jikan API
- Store user data and preferences in MySQL
- Extract unique anime IDs using a Python script

## Tech Stack

**Frontend:**
- HTML
- CSS
- JavaScript

**Backend:**
- Node.js
- Express
- MySQL

**APIs:**
- Jikan API (https://docs.api.jikan.moe/)

**Scripts:**
- Python

## Prerequisites

To run this project on your local machine, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [MySQL](https://dev.mysql.com/downloads/installer/)
- [Python](https://www.python.org/downloads/)

## Installation

1. **Clone the repository:**

    ```bash
    https://github.com/VeeralTiwari/Anime-Recommendation-app.git
    cd Anime-Recommendation-app
    ```

2. **Install backend dependencies:**

    ```bash
    npm install express mysql 
    ```

3. **Set up MySQL database:**

    - Create a MySQL database.
    - Update the database configuration in `config.js`.

4. **Run the backend server:**

    ```bash
    node app.js
    ```

5. **Run the Python script:**

    ```bash
    python extract_ids.py
    ```

6. **Open `index.html` in your browser to view the app.**

## Usage

1. Start the Node.js server:

    ```bash
    node app.js
    ```

2. Ensure your MySQL server is running.

3. Access the app via `http://localhost:3000`.

## Contributing

Contributions are welcome! Please create an issue or submit a pull request.

## Acknowledgements

- [Jikan API](https://jikan.moe/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Python](https://www.python.org/)

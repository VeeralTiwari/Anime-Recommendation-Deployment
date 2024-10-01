from bs4 import BeautifulSoup
import requests
import json
from flask import Flask, render_template, jsonify
import os

app = Flask(__name__, template_folder='')


url_container = [
    'https://myanimelist.net/anime/genre/1/Action',
    'https://myanimelist.net/anime/genre/2/Adventure?page=2',
    'https://myanimelist.net/anime/genre/8/Drama?page=3',
    'https://myanimelist.net/anime/genre/22/Romance',
    'https://myanimelist.net/anime/genre/10/Fantasy?page=2',
    'https://myanimelist.net/anime/genre/36/Slice_of_Life?page=1',
    'https://myanimelist.net/anime/genre/7/Mystery',
    'https://myanimelist.net/anime/genre/14/Horror',
    'https://myanimelist.net/anime/genre/24/Sci-Fi',
    'https://myanimelist.net/anime/genre/37/Supernatural',
    'https://myanimelist.net/anime/genre/41/Suspense',
    'https://myanimelist.net/anime/genre/4/Comedy',
    'https://myanimelist.net/anime/genre/30/Sports'
]

def FetchAjax(url):
    anime_ids = set()  # Use a set to avoid duplicates
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')

    # Extract unique anime IDs

    # Find all anchor tags with href containing "myanimelist.net/anime/"
    for a_tag in soup.find_all('a', href=True):
        href = a_tag['href']
        if 'myanimelist.net/anime/' in href:
            # Extract the anime ID from the URL
            anime_id = href.split('/')[4]  # The ID is the fifth element in the URL path
            anime_ids.add(anime_id)
    return anime_ids


container = []; #contains all the arrays of genres containing speicfic ids
for url in url_container:
    obj = FetchAjax(url);
    anime_id_array = [];

    for i in obj:
        if(i == 'season?_location=mal_h_m' or i== 'genre'):
            continue
        anime_id_array.append(int(i));
    container.append(anime_id_array);

@app.route('/discover')
def index():
    json_doc = json.dumps(container);
    return render_template('discover.html', json_data = json_doc)

if __name__ == "__main__":
    app.run(debug=True)
async function fetchAnimeData(id) {
    const apiUrl = `https://api.jikan.moe/v4/anime/${id}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await response.json();
      return res.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async function GetStoreAllanimeData(n) {
    for (let i = n; i <= n; i++) {
        let res = await fetchAnimeData(i);
        if (!res) {
            console.error(`Failed to fetch data for anime ID: ${i}`);
            continue;
        }

        const payload = {
            title: res.title_english || res.title,
            id: res.mal_id,
            genres: res.genres.map(g => g.name),
            studios: res.studios.map(s => s.name),
            popularity: res.popularity,
            demographics: res.demographics.map(d => d.name),
            format: res.type
        };

        console.log(payload);

        try {
            const response = await fetch("http://localhost:6001/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) {
                console.log(`Anime ID ${i} added successfully!`);
            } else {
                console.error(`Error storing anime ID ${i}: ${data.message}`);
              if(data.missing)
                break;
            }
        } catch (error) {
            console.error(`Network error while storing anime ID ${i}:`, error);
        }
    }
}

  GetStoreAllanimeData(210);
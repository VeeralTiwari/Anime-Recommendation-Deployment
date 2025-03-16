const catalogs = document.querySelector(".catalogs");
const loader = document.querySelector(".loader");
const login = document.querySelector(".login-tab");

const logged = async () => {
  try {
    let res = await fetch('http://127.0.0.1:3000/get-env', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    const id = data.userId;
    return id !== 'guest';
  } catch (error) {
    console.error('Error:', error);
    return false; // Default to logged out on error
  }
};
let isLogged;
logged()
.then(d => isLogged = d)
.then(()=>{ if(isLogged){
  login.textContent = "Logout";
  login.classList.add('logout-tab');
}});

login.addEventListener('click', async (e)=>{
  e.preventDefault();
  const logout_tab = document.querySelector('.logout-tab');
  if(!logout_tab)
    return;
  logout_tab.classList.remove('logout-tab');
  logout_tab.textContent = "Login";
  const res = await fetch('http://127.0.0.1:3000/get-env', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  console.log(data);
  window.location.href = "login.html";
});

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

async function renderData(data, id) {
  console.log(data);
  let name = data.title_english || data.title;
  
  let anime_end = data.aired.to ? data.aired.to.slice(0, 4) : "";
  const duration = anime_end != "" ? data.aired.from.slice(0, 4) + "-" + anime_end : data.aired.from.slice(0, 4);
  
  const genre = data.genres.map(g => g.name).join(", ");
  console.log(genre);
  const image_url = data.images.jpg.image_url;
  const synopsis = data.synopsis;
  const rating = data.score;
  let members = data.members >= 1000000 ? Math.trunc(data.members / 1000000) + "M" : Math.trunc(data.members / 1000) + "K";
  const jsonData = JSON.stringify(data);

  const html = `<div class="box">
                <div class = "head">
                <h3 id="name">${name}</h3>
                <p id="time">${duration}</p>
                </div>
                <div id="genre">${genre}</div>
                <div class= "flex-con">
                    <div class="ll dir">
                        <div class="box-img">
                            <img src="${image_url}" alt="">
                        </div>
                    </div>
                    <div class="rr dir">${synopsis}</div>
                </div>
                <div class="box-footer">
                    <i class="fa-regular fa-star"> ${rating}</i> 
                    <i class="fa-solid fa-user"> ${members}</i>
                    <button class="btn addtoList" id="${id}">Add to MyList</button>
                </div>  
            </div>`;
  catalogs.insertAdjacentHTML("beforeend", html);

  async function insertData() {
    let userId = await fetch('http://127.0.0.1:3000/get-env', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
      
    });
    userId = await userId.json();
    console.log(userId.msg, userId.userId);
    userId = userId.userId;
    if(userId === 'guest'){
      alert("Please login to continue");
      return;
    }
    const interactionData = {
      userId : userId,
      catalog_id: data.mal_id,
      metadata: jsonData
    };
    fetch('http://127.0.0.1:3000/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interactionData)
    })
    .then(response => response.json())
    .then(msg => {
      console.log(msg.msg);
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error saving interaction data');
    });
  }

  const myListAdderButton = document.getElementById(`${id}`);
  myListAdderButton.addEventListener('click', insertData);
}

async function fetchAnimeList() {
  let userId = await fetch('http://127.0.0.1:3000/get-env', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  });
  userId = await userId.json();
  console.log(userId.msg, userId.userId);
  userId = userId.userId;
  if(userId === 'guest'){
    const delayBetweenRequests = 200; // milliseconds
    const arr = homePage;      // from Script_database
    let set = new Set();
    
    let ajaxContent = [];
    // Data Collection and Rendering
    while (ajaxContent.length < 12) {
      let num = Math.floor(Math.random() * 100);
      let id = arr[num];
      let data = await fetchAnimeData(id);
      if (data) {
        ajaxContent.push(data);
        await renderData(data, id);
        set.add(data);
      }
      await delay(delayBetweenRequests);
    }
    return;
  }
  const res = await fetch('http://127.0.0.1:3000/get-list',  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId: userId})
  });
  const data = await res.json();
  data.forEach(async element => {
    const response = await fetch('http://127.0.0.1:3000/get-similar',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mal_id : element.catalog_id})
    });
    const similars = await response.json();
    console.log(similars);
    similars.forEach(async element => {
      let api_res;
      while(!api_res){
        api_res = await fetchAnimeData(element.mal_id);
      }
      if (api_res) {
        await renderData(api_res, element.mal_id);
      }
    });
  });

  loader.classList.add("hidden");
  document.querySelector('footer').classList.toggle("hidden");
}

// Start fetching anime data
fetchAnimeList();

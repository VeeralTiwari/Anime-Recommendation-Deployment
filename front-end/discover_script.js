'use-strict'
const catalogs = document.querySelector(".catalogs");
const genreList = document.querySelectorAll(".genre-heading");
const loader = document.querySelector(".loader");
const loadmore = document.querySelector(".loadmore");
const login = document.querySelector(".login-tab");

const logged = async ()=>{
  const res = await fetch('https://anime-server-rrxx.onrender.com/get-env', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  });
  const id = res.userId;
  return id !== 'guest';
}
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
  const res = await fetch('https://anime-server-rrxx.onrender.com/get-env', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  console.log(data);
  window.location.href = "login.html";
});

// Function to delay execution for a specified number of milliseconds
async function delay(ms) {
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
  // console.log(typeof(jsonData), jsonData);

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
                    <i class="fa-regular fa-star">${rating}</i> 
                    <i class="fa-solid fa-user">${members}</i>
                    <button class="btn addtoList" id="${id}">Add to MyList</button>
                </div>  
            </div>`;
  catalogs.insertAdjacentHTML("beforeend", html);
  const myListAdderButton = document.getElementById(`${id}`);
  
  myListAdderButton.addEventListener('click', async function () {
    let userId = await fetch('https://anime-server-rrxx.onrender.com/get-env', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    });
    userId = await userId.json();
    userId = userId.userId;
    console.log("button clicked");
    const interactionData = {
      userId : userId,
      catalog_id: data.mal_id,
      metadata: jsonData
    };
    fetch('https://anime-server-rrxx.onrender.com/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interactionData)
    })
    .then(response => response.json())
    .then(msg => {
      console.log('Success:', msg.msg);
      alert('Interaction data saved successfully');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error saving interaction data');
    });
  });
}
async function fetchAnime(element,num) {
  let genre_indice = Number(element.getAttribute("index"));

  // Fetch the array of anime IDs for the selected genre
  const arr = dummy[genre_indice];
  if (!arr) {
    console.error(`No anime found for genre: ${genre_indice}`);
    return;
  }
  const delayBetweenRequests = 100;  
  let ajaxContent = [];
  //Data Collection and Rendering
  while (ajaxContent.length < 12) {
    let id = arr[num[0]];
    let data = await fetchAnimeData(id);
    if (data) {
      ajaxContent.push(data);
      renderData(data, id);
      num[0]++;
    }
    document.querySelector('footer').classList.toggle("hidden");
    await delay(delayBetweenRequests);
  }
}

let currentGenreElement = null;

async function displayAnimes(event) {
  const element = event.currentTarget;
  if(element == currentGenreElement)
    return;
  catalogs.innerHTML = '';
  loader.classList.remove("hidden");
  document.querySelector('footer').classList.toggle("hidden");
  if (currentGenreElement) {
    currentGenreElement.classList.remove("on-click");
  }
  currentGenreElement = element;
  currentGenreElement.classList.add("on-click");
  let num = [0];                          //BECAUSE arrays are passed by refference in JS while variables aren't
  await fetchAnime(element, num);
  loader.classList.add("hidden");
  loadmore.classList.remove("hidden");
  document.querySelector('footer').classList.toggle("hidden");
  
  loadmore.addEventListener("click" , async ()=>{
    loader.classList.remove("hidden");
    loadmore.classList.add("hidden");
    await fetchAnime(element, num);
    loader.classList.add("hidden");
    if(num < 100)
      loadmore.classList.remove("hidden");
  });
}
genreList.forEach(element => {
  element.addEventListener("click", displayAnimes);
});

// from script.js ---> has to be imported while using http(s) --->good practice
async function fetchAnimeList() {
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
  loader.classList.add("hidden");
  document.querySelector('footer').classList.toggle("hidden");
}

fetchAnimeList();

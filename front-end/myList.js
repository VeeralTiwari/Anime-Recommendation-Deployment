const catalogs = document.querySelector(".catalogs");
const loader = document.querySelector(".loader");
const footer = document.querySelector("footer");

async function fetchData() {
    try {
        const response = await fetch('https://anime-recommendation-deployment-2.onrender.com', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json(); // Parse response as JSON
        console.log('Success:', data);
        console.log(typeof(data)); // Should log 'object' if it's a JSON array/object

        return data;
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching data');
    }
}
async function renderData(data, id) {
    console.log(data);
    let name =  data.title;
    let eng_name =  data.title_english;
    eng_name = eng_name === null ? "" : eng_name;
    const rank = data.rank;
    const Popularity = data.popularity;
    const premiere = (data.aired).string.slice(0,12);
    let anime_end = data.aired.to ? data.aired.to.slice(0, 4) : "";
    const duration = anime_end != "" ? data.aired.from.slice(0, 4) + "-" + anime_end : data.aired.from.slice(0, 4);
    
    const genre = data.genres.map(g => g.name).join(", ");
    console.log(genre);
    const image_url = data.images.jpg.image_url;
    const synopsis = data.synopsis;
    const rating = data.score;
    let members = data.members >= 1000000 ? Math.trunc(data.members / 1000000) + "M" : Math.trunc(data.members / 1000) + "K";
    const studio_list = data.studios;
    const studios = studio_list.map( s=> s.name).join(", ");
    
    // console.log(typeof(jsonData), jsonData);
  
    const html = `<div class="box2">
                <div class="title">
                    ${name} <br> <sb style="font-weight: 200; font-size: smaller;">${eng_name}</sb>
                </div>
                <div class="content">
                    <div class="content-item image">
                        <div class="box-img2">
                            <img src="${image_url}" alt="" width="300px">
                        </div>
                    </div>  
                    <div class="content-item details">
                        <div class="body">
                            <score>
                                <text style="margin-bottom: 0px;">Score⭐</text> <br>
                                <text style="font-weight: 700; font-size: 50px  ;">${rating}</text>
                                
                            </score>
                            <div >
                                <ana class="analytics">Ranked : <b>#${rank}</b></ana>
                                <ana class="analytics">Popularity: <b>#${Popularity}</b> </ana>
                                <ana class="analytics">Members: <b>${members}</b> </ana>
                                <div style="margin-top: 25px;" class="analytics">
                                    <text class="br" style="font-size: smaller;">${studios}</text>
                                    <text class="br" style="font-size: smaller;">${data.type}</text>
                                    <text style="font-size: smaller;">${premiere}</text>
                                </div>
                            </div>
                        </div>
                        <div class="body">
                            <text class="spacing" style="font-size: smaller;">Status : <b>${data.status}</b></text>

                            <text class="spacing"> <button id = "marked-${id}" class="btn" view = no>Mark as viewed  ? </button></text>

                            <text class="spacing" style="font-size: smaller; display: flex;">Episodes: <text class="episodes"><num id="num-${id}">0</num><total>/${data.episodes}</total></text><button id="count-${id}"><i class="fa-solid fa-plus" style= "padding: 5px 5px 0px 5px;"></i></button></text>
                        </div>
                        <div class="synopsis">
                            <h4>Synopsis</h4>
                            <p style="font-size: 17px;">${synopsis}</p>
                        </div>
                    </div>
                </div>
            </div>`;
    catalogs.insertAdjacentHTML("beforeend", html);
    const mark_id = "marked-" + id;
    const num_id = "num-" + id;
    const count_id = "count-" + id;
    
    const markedbutton = document.getElementById('mark_id');
    markedbutton.addEventListener('click', ()=>{
        let view = markedbutton.getAttribute('view');
        if(view === "no")
        {
            markedbutton.textContent = "Viewed  ✌️";
            markedbutton.setAttribute('view', "yes");
        }
        else
        {
            markedbutton.textContent = "Mark as viewed  ? ";
            markedbutton.setAttribute('view', "no")  ;
        }
    });
    const count_episodes = document.getElementById("count_id");
    count_episodes.addEventListener('click' , ()=>{
        let count = Number(document.getElementById('num_id').textContent);
        if(count < episodes)
            count++;
        document.getElementById('num_id').textContent = count;
    });
}  
async function viewData() {
    const arr = await fetchData(); // Await the data fetched from fetchData()
    console.log(arr);
    // Add your code here to render the data to the DOM, e.g., using catalogs.innerHTML
    arr.forEach(async element => {
        let str = element.metadata;
        const data = JSON.parse(str);
        const id = element.catalog_id;
        renderData(data,id);
    });
    footer.classList.remove("hidden");
}
viewData(); // No need to pass arr since it's handled inside renderdata()

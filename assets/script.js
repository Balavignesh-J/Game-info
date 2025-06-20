api = "http://www.omdbapi.com/?";
key = "99c56f68";

const mname = document.getElementById("mname");
const year = document.querySelector("#year");
const submit = document.getElementById("submit");
const display = document.querySelector(".info");
let likedid = [];

/* Searching section */
submit.addEventListener("click", async () => {
  const movie_name = mname.value;
  const movie_year = year.value;
  const movie_data = await getdata(movie_name, movie_year, "");
  information(movie_data);
  console.log(movie_data);
});

/* Display details section */
const information = (data) => {
  display.classList.remove("display");
  display.innerHTML = "";
  if (data.Response === "True") {
    display.innerHTML = `
        <h1>${data.Title}</h1>
        <p>${data.Released}</p>
        <img src=${data.Poster} alt="poster">
        <h3>cast and crew : ${data.Actors}</h3>
        <p>BoxOffice: ${data.BoxOffice}</p>
        <p>Country: ${data.Country}</p>
        <p>Director: ${data.Director}</p>
        <p>Genre: ${data.Genre}</p>
        <p>Language: ${data.Language}</p>
        <p>Type: ${data.Type}</p>
        <p>Rating : ${data.Ratings[0].Value}</p>
        <button id="plot">Plot</button>
        <div class="story display">${data.Plot}
        <button id="hide">Hide</button>
        </div>
        <button id="watch">Want to watch</button>
        `;
  } else {
    const h1 = document.createElement("h1");
    h1.textContent = "Not found";
    display.appendChild(h1);
  }
  const story = document.querySelector(".story");
  const plot = document.getElementById("plot");
  const hide = document.getElementById("hide");
  const watch = document.getElementById("watch");

  plot.addEventListener("click", () => {
    story.classList.remove("display");
  });

  hide.addEventListener("click", () => {
    story.classList.add("display");
  });

  watch.addEventListener("click", async () => {
    const check = likedid.includes(data.imdbID);
    if (!check) {
      likedid.push(data.imdbID);
      console.log(likedid);
      await liketowatch();
    }
  });
};

/* Want to watch section */
const section = document.getElementById("blank");
let likeinfo = [];

const liketowatch = async () => {
  if (likedid.length !== 0) {
    section.classList.add("display");
    for (let i = 0; i < likedid.length; i++) {
      const like = await getdata("", "", likedid[i]);
      if (!likeinfo.some((movie) => movie.imdbID === like.imdbID)) {
        likeinfo.push(like);
      }
    }
    console.log(likeinfo);
  } else {
    section.classList.remove("display");
  }
  localStorage.setItem("wanttowatch", JSON.stringify(likeinfo));
};

const wanttowatch = () => {
  d=localStorage.getItem("wanttowatch")
  likeinfo=JSON.parse(d)||[]
  likeinfo.forEach((data) => {
    pos = document.createElement("img");
    pos.src = data.Poster;
    title = document.createElement("p");
    title.textContent = data.Title;

    section.classList.remove("display");
    section.appendChild(pos);
    section.appendChild(title);
  });
};

/* Get data from api */
const getdata = async (name = "", year = "", id = "") => {
  let response;
  if (id) {
    response = await fetch(`${api}i=${id}&apikey=${key}`);
  } else if (year) {
    response = await fetch(
      `${api}t=${name
        .split(" ")
        .join("+")}&year=${year}&plot=full&apikey=${key}`
    );
  } else {
    response = await fetch(
      `${api}t=${name.split(" ").join("+")}&plot=full&apikey=${key}`
    );
  }
  const detail = await response.json();
  return detail;
};

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem("wanttowatch");
  if (saved) {
    likeinfo = JSON.parse(saved);
    likedid = likeinfo.map(movie => movie.imdbID);
    wanttowatch();
  }
});
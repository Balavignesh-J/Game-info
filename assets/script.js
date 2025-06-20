const api = "http://www.omdbapi.com/?";
const key = "99c56f68";

const mname = document.getElementById("mname");
const year = document.querySelector("#year");
const submit = document.getElementById("submit");
const display = document.querySelector(".info");
let likedid = [];

/* Searching section */
submit.addEventListener("click", async () => {
  try {
    const movie_name = mname.value.trim();
    const movie_year = year.value.trim();
    if (!movie_name) {
      alert("Please enter a movie name");
      return;
    }
    const movie_data = await getdata(movie_name, movie_year, "");
    information(movie_data);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    display.innerHTML = "<h1>Error loading movie data</h1>";
  }
});

/* Display details section */
const information = (data) => {
  display.classList.remove("display");
  display.innerHTML = "";

  if (data.Response === "True") {
    display.innerHTML = `
      <h1>${data.Title}</h1>
      <p>${data.Released}</p>
      <img src="${
        data.Poster !== "N/A"
          ? data.Poster
          : ""
      }" alt="poster">
      <h3>Cast and Crew: ${data.Actors}</h3>
      <p>BoxOffice: ${data.BoxOffice || "N/A"}</p>
      <p>Country: ${data.Country}</p>
      <p>Director: ${data.Director}</p>
      <p>Genre: ${data.Genre}</p>
      <p>Language: ${data.Language}</p>
      <p>Type: ${data.Type}</p>
      <p>Rating: ${data.Ratings?.[0]?.Value || "N/A"}</p>
      <button id="plot">Plot</button>
      <div class="story display">${data.Plot}
        <button id="hide">Hide</button>
      </div>
      <button id="watch">Want to watch</button>
    `;

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
      if (!likedid.includes(data.imdbID)) {
        likedid.push(data.imdbID);
        localStorage.setItem("likedids", JSON.stringify(likedid));
        await liketowatch();
      } else {
        alert(`${data.Title} is already in your watch list!`);
      }
    });
  } else {
    display.innerHTML = "<h1>Movie not found</h1>";
  }
};

/* Want to watch section */
const section = document.getElementById("blank");
let likeinfo = [];

const liketowatch = async () => {
  try {
    section.innerHTML = ""; 
    likeinfo = []; 

    if (likedid.length === 0) {
      section.classList.add("display");
      localStorage.setItem("wanttowatch", JSON.stringify([]));
      return;
    }

    const moviePromises = likedid.map((id) => getdata("", "", id));
    const movies = await Promise.all(moviePromises);

    likeinfo = movies.filter((movie) => movie.Response === "True");
    localStorage.setItem("wanttowatch", JSON.stringify(likeinfo));
    wanttowatch();
  } catch (error) {
    console.error("Error updating watch list:", error);
  }
};

const wanttowatch = () => {
  section.innerHTML = ""; 

  const savedData = localStorage.getItem("wanttowatch");
  likeinfo = savedData ? JSON.parse(savedData) : [];

  if (likeinfo.length === 0) {
    section.classList.add("display");
    return;
  }

  section.classList.remove("display");

  likeinfo.forEach((data) => {
    const movieContainer = document.createElement("div");
    movieContainer.className = "movie-item";

    const poster = document.createElement("img");
    poster.src =
      data.Poster !== "N/A"
        ? data.Poster
        : "https://via.placeholder.com/150x225?text=No+Poster";
    poster.alt = `${data.Title} poster`;

    const title = document.createElement("p");
    title.textContent = data.Title;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
      likedid = likedid.filter((id) => id !== data.imdbID);
      likeinfo = likeinfo.filter((movie) => movie.imdbID !== data.imdbID);

      localStorage.setItem("likedids", JSON.stringify(likedid));
      localStorage.setItem("wanttowatch", JSON.stringify(likeinfo));

      wanttowatch();
    });

    movieContainer.appendChild(poster);
    movieContainer.appendChild(title);
    movieContainer.appendChild(removeBtn);
    section.appendChild(movieContainer);
  });
};

/* Get data from api */
const getdata = async (name = "", year = "", id = "") => {
  let url;
  if (id) {
    url = `${api}i=${id}&apikey=${key}`;
  } else if (year) {
    url = `${api}t=${encodeURIComponent(
      name
    )}&year=${year}&plot=full&apikey=${key}`;
  } else {
    url = `${api}t=${encodeURIComponent(name)}&plot=full&apikey=${key}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return await response.json();
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedIds = localStorage.getItem("likedids");
  const savedMovies = localStorage.getItem("wanttowatch");

  if (savedIds) {
    likedid = JSON.parse(savedIds);
  }

  if (savedMovies) {
    likeinfo = JSON.parse(savedMovies);
    wanttowatch();
  }
});

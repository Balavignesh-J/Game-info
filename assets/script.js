api = "http://www.omdbapi.com/?";
key = "99c56f68";

const mname = document.getElementById("mname");
const year = document.querySelector("#year");
const submit = document.getElementById("submit");
const display = document.querySelector(".info");
let liked =[]

submit.addEventListener("click", async () => {
  const movie_name = mname.value;
  const movie_year = year.value;
  const movie_data = await getdata(movie_name, movie_year);
  information(movie_data);
  console.log(movie_data);
});

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
  const watch = document.getElementById("watch")

  plot.addEventListener("click", () => {
    story.classList.remove("display");
  });

  hide.addEventListener("click", () => {
    story.classList.add("display");
  });

  watch.addEventListener("click",()=>{
    liked.push(data.imdbID)
    console.log(liked)
  })
};

const getdata = async (name="", year = "",id="") => {
  let response;
  if (year) {
    response = await fetch(
      `${api}t=${name
        .split(" ")
        .join("+")}&year=${year}&plot=full&apikey=${key}`
    );
  } else if (year==="") {
    response = await fetch(
      `${api}t=${name.split(" ").join("+")}&plot=full&apikey=${key}`
    );
  } else {
    response = await fetch(
      `${api}i=${id}&plot=full&apikey=${key}`
    );
  }
  const detail = await response.json();
  return detail;
};

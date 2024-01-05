const accessKey = "jhovpFU6rrn3kL41ouVHkoqDYwcki60pircT71DUE-o";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchRS = document.querySelector(".search-results");
const more = document.getElementById("more");

let inputData = "";
let page = 1;

async function searchImgs() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchRS.innerHTML = "";
  }

  results.map((result) => {
    const imgWrap = document.createElement("div");
    imgWrap.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    

    const imgLink = document.createElement("a");
    imgLink.href = result.links.html;
    imgLink.textContent = result.alt_description;

    imgWrap.appendChild(image);
    imgWrap.appendChild(imgLink);
    searchRS.appendChild(imgWrap);
  });
  page++;

  if (page > 1) {
    more.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImgs();
});

more.addEventListener("click", () => {
  searchImgs();
});

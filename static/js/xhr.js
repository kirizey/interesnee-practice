const tableBody = document.querySelector(".cars-list__body");
const tableElement = document.querySelector(".cars-list");
const prevPageArrow = document.querySelector("#prev-page-arrow");
const nextPageArrow = document.querySelector("#next-page-arrow");
const totalPagesElement = document.querySelector(".pages__total");
const currentPageElement = document.querySelector(".pages__current");
const searchBar = document.querySelector("#header__search-bar");

const apiUrl = "https://backend-jscamp.saritasa-hosting.com/api/cars";

//push markup error if 503 status
let appendTableError = () => {
  const errorDiv = document.createElement("div");
  errorDiv.innerText = "No data. Refresh the page or try continue.";
  errorDiv.classList.add("cars-list__error-msg");
  document.querySelector("body").appendChild(errorDiv);

  setTimeout(function() {
    errorDiv.remove();
  }, 2000);
};

//fill the row of table
let appendCarInstanceInTable = car => {
  let tr = document.createElement("tr");

  let make = document.createElement("th");
  make.innerText = car.make.name;
  tr.appendChild(make);

  let model = document.createElement("th");
  model.innerText = car.car_model.name;
  tr.appendChild(model);

  let bodyType = document.createElement("th");
  bodyType.innerText = car.body_type.name;
  tr.appendChild(bodyType);

  let year = document.createElement("th");
  year.innerText = car.year;
  tr.appendChild(year);

  let mileage = document.createElement("th");
  mileage.innerText = car.mileage;
  tr.appendChild(mileage);

  let description = document.createElement("th");
  description.innerText = car.description;
  tr.appendChild(description);

  let created_at = document.createElement("th");
  created_at.innerText = car.created_at;
  tr.appendChild(created_at);

  let updated_at = document.createElement("th");
  updated_at.innerText = car.updated_at;
  tr.appendChild(updated_at);

  tableBody.appendChild(tr);
};

//render cars
let getCars = async url => {
  let xhr = await new XMLHttpRequest();
  await xhr.open("GET", url, false);
  await xhr.send();

  if (xhr.status === 200) {
    //remove old data
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }

    let cars = await JSON.parse(xhr.response).results;

    let paginationData = await JSON.parse(xhr.response).pagination;

    currentPageElement.innerText = await paginationData.current_page;

    paginationData.current_page === 1
      ? prevPageArrow.setAttribute("disabled", true)
      : prevPageArrow.removeAttribute("disabled", true);

    totalPagesElement.innerText = await paginationData.total_pages;

    paginationData.total_pages === parseInt(currentPageElement.innerText)
      ? nextPageArrow.setAttribute("disabled", true)
      : nextPageArrow.removeAttribute("disabled", true);

    //fill table
    cars.length > 0
      ? cars.map(car => {
          appendCarInstanceInTable(car);
        })
      : null;
  } else {
    appendTableError();
  }
};

//initial table state
getCars(`${apiUrl}?page=1`);

//search data
let searchQuery = e => {
  e.preventDefault();

  getCars(`${apiUrl}?keyword=${e.target.elements.queryText.value}`);
};

searchBar.addEventListener("submit", searchQuery);

//pagination moving
let getNextPage = () => {
  const urlParams = window.location.search;
  console.log(urlParams);
  getCars(`${apiUrl}?page=${parseInt(currentPageElement.innerText) + 1}`);
};
let getPrevPage = () =>
  getCars(`${apiUrl}?page=${parseInt(currentPageElement.innerText) - 1}`);

nextPageArrow.addEventListener("click", getNextPage);
prevPageArrow.addEventListener("click", getPrevPage);

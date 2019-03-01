const tableBody = document.querySelector(".cars-list__body");
const tableElement = document.querySelector(".cars-list");
const prevPageArrow = document.querySelector("#prev-page-arrow");
const nextPageArrow = document.querySelector("#next-page-arrow");
const totalPagesElement = document.querySelector(".pages__total");
const currentPageElement = document.querySelector(".pages__current");
const searchBar = document.querySelector("#header__search-bar");
const searchInput = document.querySelector("#search-input");

const producerSortFilter = document.querySelector("#producer-filter");
const modelSortFilter = document.querySelector("#model-filter");
const bodyTypeSortFilter = document.querySelector("#body-type-filter");
const yearSortFilter = document.querySelector("#year-filter");
const mileageSortFilter = document.querySelector("#mileage-filter");
const descriptionSortFilter = document.querySelector("#description-filter");
const createdSortFilter = document.querySelector("#created-filter");
const updatedSortFilter = document.querySelector("#updated-filter");

let searchQuery = "";
let sortBy = "";
let sortOrder = "";

const apiUrl = "https://backend-jscamp.saritasa-hosting.com/api/cars";

//push markup error if 503 status
const pushPopup = message => {
  const errorDiv = document.createElement("div");
  errorDiv.innerText = message;
  errorDiv.classList.add("cars-list__error-msg");
  document.querySelector("body").appendChild(errorDiv);

  setTimeout(() => errorDiv.remove(), 3000);
};

//fill the row of table
const appendCarInstanceInTable = car => {
  let tr = document.createElement("tr");

  let make = document.createElement("th");
  make.innerHTML = car.make.name;
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
const getCars = async url => {
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
    cars.length > 0 ? cars.map(car => appendCarInstanceInTable(car)) : null;
  } else {
    pushPopup("Connection error, try again");
  }
};

//initial table state
getCars(`${apiUrl}?page=1`);

//search data
const searchData = e => {
  e.preventDefault();

  let sortQuery = sortBy ? `&order_by=${sortBy}&sort_order=${sortOrder}` : "";

  getCars(`${apiUrl}?keyword=${e.target.elements.queryText.value}${sortQuery}`);
};

//pagination moving
const getNextPage = () => {
  let sortQuery = sortBy ? `&order_by=${sortBy}&sort_order=${sortOrder}` : "";

  getCars(
    `${apiUrl}?page=${parseInt(currentPageElement.innerText) +
      1}&keyword=${searchQuery}${sortQuery}`
  );
};

const getPrevPage = () => {
  let sortQuery = sortBy ? `&order_by=${sortBy}&sort_order=${sortOrder}` : "";

  getCars(
    `${apiUrl}?page=${parseInt(currentPageElement.innerText) -
      1}&keyword=${searchQuery}${sortQuery}`
  );
};

//create car query to API
const createCar = async e => {
  let xhr = await new XMLHttpRequest();

  await xhr.open("POST", apiUrl, false);

  let formData = await new FormData(document.querySelector(".add-car-form"));

  await xhr.send(formData);

  xhr.status === 200
    ? pushPopup("Created")
    : pushPopup("Server error. Try again.");
};

//style input red red color if it's invalid
const rejectField = (element, errorMessage) => {
  element.classList.add("rejected");
  pushPopup(errorMessage);
};

//reset invalid color on "year" input
const unrejectField = element => element.classList.remove("rejected");

//validate "year" field in create car form
const formValidation = e => {
  e.preventDefault();

  const year = e.target.elements.year.value;

  const currentYear = new Date().getFullYear();

  if (year < 1900 || year > currentYear) {
    rejectField(
      e.target.elements.year,
      `Year must greather than 1900 and less than ${currentYear}`
    );
  } else {
    createCar();
    unrejectField(e.target.elements.year);
  }
};

//get sorted query to API based on field
const makeSortedQuery = (field, event) => {
  sortBy = field;
  sortOrder = event.target.value;
  console.log(sortOrder);
  sortOrder
    ? getCars(`${apiUrl}?&order_by=${field}&sort_order=${sortOrder}`)
    : getCars(`${apiUrl}`);

  searchQuery = "";
};

//listners for sort query
producerSortFilter.addEventListener("change", e =>
  makeSortedQuery("make.name", e)
);

modelSortFilter.addEventListener("change", e =>
  makeSortedQuery("car_model.name", e)
);

bodyTypeSortFilter.addEventListener("change", e =>
  makeSortedQuery("body_type.name", e)
);

yearSortFilter.addEventListener("change", e => makeSortedQuery("year", e));

mileageSortFilter.addEventListener("change", e =>
  makeSortedQuery("mileage", e)
);

descriptionSortFilter.addEventListener("change", e =>
  makeSortedQuery("description", e)
);

createdSortFilter.addEventListener("change", e =>
  makeSortedQuery("created_at", e)
);

updatedSortFilter.addEventListener("change", e =>
  makeSortedQuery("updated_at", e)
);

nextPageArrow.addEventListener("click", getNextPage);
prevPageArrow.addEventListener("click", getPrevPage);

//save the search text
searchInput.addEventListener("keydown", e => (searchQuery = e.target.value));

addCarForm.addEventListener("submit", formValidation);

searchBar.addEventListener("submit", searchData);

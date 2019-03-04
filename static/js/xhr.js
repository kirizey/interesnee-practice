// table elements
const tableBodyElement = document.querySelector(".cars-list__body"),
  tableElement = document.querySelector(".cars-list");

//paginator elements
const prevPageArrow = document.querySelector("#prev-page-arrow"),
  nextPageArrow = document.querySelector("#next-page-arrow"),
  totalPagesElement = document.querySelector(".pages__total"),
  currentPageElement = document.querySelector(".pages__current");

//searchbar elements
const searchBar = document.querySelector("#header__search-bar");
const searchInput = document.querySelector("#search-input");

//dynamic form elements
const carForm = document.querySelector(".car-form"),
  carFormTitle = document.querySelector("#car-form__title"),
  submitFormButton = document.querySelector("#form-submit-btn"),
  formBtns = document.querySelector(".car-form__btns");

//year field in table
const yearField = carForm.elements.year;

const toggleCreateForm = document.querySelector("#add-car-btn"),
  modalWrapper = document.querySelector(".modal-wrapper");

//table filter elements
const producerSortFilter = document.querySelector("#producer-filter"),
  modelSortFilter = document.querySelector("#model-filter"),
  bodyTypeSortFilter = document.querySelector("#body-type-filter"),
  yearSortFilter = document.querySelector("#year-filter"),
  mileageSortFilter = document.querySelector("#mileage-filter"),
  descriptionSortFilter = document.querySelector("#description-filter"),
  createdSortFilter = document.querySelector("#created-filter"),
  updatedSortFilter = document.querySelector("#updated-filter");

let searchQuery = "",
  sortBy = "",
  sortOrder = "",
  pageCars = [];

const apiUrl = "https://backend-jscamp.saritasa-hosting.com/api/cars";

// show/hide form toggler
const toggleModal = () => modalWrapper.classList.toggle("hidden");

//form method handler
const toggleCarModalForm = (e, method) => {
  //prevent close modal while click on form
  if (e.target.closest(".car-form")) return;

  //close modal by click outside form
  if (method === "closeModal") {
    toggleModal();
  }

  //if create car
  if (method === "POST") {
    toggleModal();
    fillForm("POST");
  } // if update car
  else if (method === "PUT") {
    const carId = e.target.parentElement.getAttribute("data-id");

    submitFormButton.setAttribute("data-carId", carId);

    let car = pageCars.filter(car => car.id === parseInt(carId))[0];

    if (car) {
      toggleModal();

      fillForm("PUT", car);
    } else {
      pushPopup("Connection error. Try one more time.");
    }
  }
};

//dynamic prepare form to post or put request
const fillForm = (method, car = "") => {
  if (method === "POST") {
    carFormTitle.innerText = `Add car`;
    yearField.removeAttribute("disabled");
    submitFormButton.innerText = "Add";

    submitFormButton.setAttribute("data-post", true);
    submitFormButton.removeAttribute("data-put");
    submitFormButton.setAttribute("data-carId", false);

    carForm.elements.body_type_id.value = "";
    carForm.elements.make_id.value = "";
    carForm.elements.year.value = "";
    carForm.elements.car_model_id.value = "";
    carForm.elements.mileage.value = "";
    carForm.elements.description.value = "";
  } else if (method === "PUT") {
    carFormTitle.innerText = `Update car #${car.id}`;
    yearField.setAttribute("disabled", true);

    submitFormButton.innerText = "Update";
    submitFormButton.setAttribute("data-put", true);
    submitFormButton.removeAttribute("data-post");

    carForm.elements.body_type_id.value = car.body_type_id;
    carForm.elements.make_id.value = car.make_id;
    carForm.elements.year.value = car.year;
    carForm.elements.car_model_id.value = car.car_model_id;
    carForm.elements.mileage.value = car.mileage;
    carForm.elements.description.value = car.description ? car.description : "";
  }
};

//create car query to API
const formSubmit = async e => {
  if (submitFormButton.getAttribute("data-post")) {
    let xhr = new XMLHttpRequest();

    await xhr.open("POST", apiUrl, false);

    let formData = new FormData(document.querySelector(".car-form"));

    await xhr.send(formData);
    if (xhr.readyState == 4 && xhr.status === 200) {
      pushPopup("Created");

      toggleModal();
    } else {
      pushPopup("Server error. Try again.");
    }
  } else if (submitFormButton.getAttribute("data-put")) {
    let xhr = new XMLHttpRequest();

    let requestBody = {
      body_type_id: carForm.elements.body_type_id.value,
      make_id: carForm.elements.make_id.value,
      car_model_id: carForm.elements.car_model_id.value,
      year: carForm.elements.year.value,
      description: carForm.elements.description.value,
      mileage: carForm.elements.mileage.value
    };
    const carId = submitFormButton.getAttribute("data-carId");

    await xhr.open("PUT", `${apiUrl}/${carId}`, false);
    await xhr.setRequestHeader("content-type", "application/json");

    await xhr.send(JSON.stringify(requestBody));

    if (xhr.readyState == 4 && xhr.status === 200) {
      pushPopup("Updated");
      toggleModal();
    } else {
      pushPopup("Server error. Try again.");
    }
  } else {
    pushPopup("Error");
  }
};

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
  tr.setAttribute("data-id", car.id);

  let make = document.createElement("th");
  make.innerHTML = car.make.name;
  make.addEventListener("click", e => toggleCarModalForm(e, "PUT"));
  tr.appendChild(make);

  let model = document.createElement("th");
  model.innerText = car.car_model.name;
  model.addEventListener("click", e => toggleCarModalForm(e, "PUT"));
  tr.appendChild(model);

  let bodyType = document.createElement("th");
  bodyType.innerText = car.body_type.name;
  bodyType.addEventListener("click", e => toggleCarModalForm(e, "PUT"));
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
  created_at.innerText = moment(car.created_at).format("DD.MM.YYYY h:mm");
  tr.appendChild(created_at);

  let updated_at = document.createElement("th");
  updated_at.innerText = moment(car.updated_at).format("DD.MM.YYYY h:mm");
  tr.appendChild(updated_at);

  tableBodyElement.appendChild(tr);
};

//render cars
const getCars = async url => {
  let xhr = new XMLHttpRequest();
  await xhr.open("GET", url, false);
  await xhr.send();

  if (xhr.readyState == 4 && xhr.status === 200) {
    //remove old data
    while (tableBodyElement.firstChild) {
      tableBodyElement.removeChild(tableBodyElement.firstChild);
    }

    let cars = JSON.parse(xhr.response).results;
    pageCars = [...cars];

    let paginationData = JSON.parse(xhr.response).pagination;

    currentPageElement.innerText = paginationData.current_page;

    paginationData.current_page === 1
      ? prevPageArrow.setAttribute("disabled", true)
      : prevPageArrow.removeAttribute("disabled", true);

    totalPagesElement.innerText = paginationData.total_pages;

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

//pagination moving (next)
const getNextPage = () => {
  let sortQuery = sortBy ? `&order_by=${sortBy}&sort_order=${sortOrder}` : "";

  getCars(
    `${apiUrl}?page=${parseInt(currentPageElement.innerText) +
      1}&keyword=${searchQuery}${sortQuery}`
  );
};

//pagination moving (previous)
const getPrevPage = () => {
  let sortQuery = sortBy ? `&order_by=${sortBy}&sort_order=${sortOrder}` : "";

  getCars(
    `${apiUrl}?page=${parseInt(currentPageElement.innerText) -
      1}&keyword=${searchQuery}${sortQuery}`
  );
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
    formSubmit(e);
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

carForm.addEventListener("submit", formValidation);

searchBar.addEventListener("submit", searchData);

toggleCreateForm.addEventListener("click", e => toggleCarModalForm(e, "POST"));

modalWrapper.addEventListener("click", e =>
  toggleCarModalForm(e, "closeModal")
);

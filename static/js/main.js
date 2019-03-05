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

//table filter elements
const producerSortFilter = document.querySelector("#producer-filter"),
  modelSortFilter = document.querySelector("#model-filter"),
  bodyTypeSortFilter = document.querySelector("#body-type-filter"),
  yearSortFilter = document.querySelector("#year-filter"),
  mileageSortFilter = document.querySelector("#mileage-filter"),
  descriptionSortFilter = document.querySelector("#description-filter"),
  createdSortFilter = document.querySelector("#created-filter"),
  updatedSortFilter = document.querySelector("#updated-filter");

const authFormTitle = document.querySelector(".authentication-form__title"),
  authFormBtn = document.querySelector(".authentication-form__button");

const carService = new CarService();

let cars = [],
  searchQuery = "",
  sortBy,
  sortOrder = "";

const createCarBtn = document.createElement("button");
const deleteCarBtn = document.createElement("button");
const updateCarBtn = document.createElement("button");

//fill the row of table
const appendCarInstanceInTable = car => {
  let tr = document.createElement("tr");
  tr.setAttribute("data-id", car.id);

  let make = document.createElement("th");
  make.innerHTML = car.make.name;
  make.addEventListener("click", e => renderUpdateForm(e, car));
  tr.appendChild(make);

  let model = document.createElement("th");
  model.innerText = car.car_model.name;
  model.addEventListener("click", e => renderUpdateForm(e, car));
  tr.appendChild(model);

  let bodyType = document.createElement("th");
  bodyType.innerText = car.body_type.name;
  bodyType.addEventListener("click", e => renderUpdateForm(e, car));
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

const renderList = carsData => {
  while (tableBodyElement.firstChild) {
    tableBodyElement.removeChild(tableBodyElement.firstChild);
  }
  if (!carsData) return;

  cars = [...carsData.results];

  let paginationData = carsData.pagination;

  currentPageElement.innerText = paginationData.current_page;

  paginationData.current_page === 1
    ? prevPageArrow.setAttribute("disabled", true)
    : prevPageArrow.removeAttribute("disabled", true);

  totalPagesElement.innerText = paginationData.total_pages;

  paginationData.total_pages === parseInt(currentPageElement.innerText)
    ? nextPageArrow.setAttribute("disabled", true)
    : nextPageArrow.removeAttribute("disabled", true);

  //fill table
  cars.map(car => appendCarInstanceInTable(car));
};

carService
  .getCars()
  .then(data => renderList(data))
  .catch(error => snackbar(error));

const searchData = e => {
  e.preventDefault();
  carService
    .getCars(1, e.target.elements.queryText.value)
    .then(data => renderList(data))
    .catch(error => snackbar(error));
};

const getNextPage = () => {
  carService
    .getCars(
      parseInt(currentPageElement.innerText) + 1,
      searchQuery,
      sortBy,
      sortOrder
    )
    .then(data => renderList(data))
    .catch(error => snackbar(error));
};

const getPreviousPage = () => {
  carService
    .getCars(
      parseInt(currentPageElement.innerText) - 1,
      searchQuery,
      sortBy,
      sortOrder
    )
    .then(data => renderList(data))
    .catch(error => snackbar(error));
};

const sortList = (field, e) => {
  sortBy = field;
  sortOrder = e.target.value;

  carService
    .getCars(1, "", sortBy, sortOrder)
    .then(data => renderList(data))
    .catch(error => snackbar(error));
};

const createCar = e => {
  let validation = validateCarForm();

  if (validation === 0) {
    const car = {
      body_type_id: carForm.elements.body_type_id.value,
      make_id: carForm.elements.make_id.value,
      car_model_id: carForm.elements.car_model_id.value,
      year: carForm.elements.year.value,
      description: carForm.description.value,
      mileage: carForm.mileage.value
    };

    carService
      .createCar(car)
      .then(res => {
        snackbar("Created");
        carModalWrapper.classList.add("hidden");
      })
      .catch(error => snackbar(error));
  }
};

const deleteCar = (e, carId) => {
  carService
    .deleteCar(carId)
    .then(() => {
      const carElement = document.querySelector(`[data-id='${carId}']`);

      if (!carElement) return;

      snackbar(`Car №${carId} was deleted`);
      carModalWrapper.classList.add("hidden");

      carElement.remove();
    })
    .catch(error => snackbar(error));
};

const updateCar = (e, carId) => {
  let validation = validateCarForm();

  if (validation === 0) {
    const bodyTypeElement = carForm.elements.body_type_id,
      makeElement = carForm.elements.make_id,
      yearElement = carForm.elements.year,
      carModelElement = carForm.elements.car_model_id,
      mileageElement = carForm.elements.mileage,
      descriptionElement = carForm.elements.description;

    const data = {
      body_type_id: bodyTypeElement.value,
      make_id: makeElement.value,
      year: yearElement.value,
      car_model_id: carModelElement.value,
      mileage: mileageElement.value,
      description: descriptionElement.value
    };

    carService
      .updateCar(carId, data)
      .then(() => {
        snackbar(`Car №${carId} was updated`);
        carModalWrapper.classList.add("hidden");

        let updatedElement = document.querySelector(`[data-id='${carId}']`)
          .children;

        updatedElement[0].innerHTML =
          makeElement.options[makeElement.selectedIndex].text;
        updatedElement[1].innerHTML =
          carModelElement.options[carModelElement.selectedIndex].text;
        updatedElement[2].innerHTML =
          bodyTypeElement.options[bodyTypeElement.selectedIndex].text;
        updatedElement[4].innerHTML = mileageElement.value;
        updatedElement[5].innerHTML = descriptionElement.value;
      })
      .catch(error => {
        snackbar(error);
      });
  }
};

const validateCarForm = () => {
  const year = carForm.elements.year;

  const currentYear = new Date().getFullYear();

  let index = 0;

  [...carForm].map(element => resetError(element));

  [...carForm].map(element => {
    if (element.tagName !== "BUTTON" && !element.value) {
      rejectField(element, "field is empty");
      index = -1;
    }
  });

  if (year.value < 1900 || year.value > currentYear) {
    rejectField(year, `1900 < year < ${currentYear}`);
    index = -1;
  }

  return index;
};

//style input red red color if it's invalid
const rejectField = (element, message) => {
  element.classList.add("rejected");
  const error = document.createElement("div");
  error.innerText = message;
  error.classList.add("car-form__validation-error");
  element.parentElement.appendChild(error);
};

const resetError = element => {
  element.classList.remove("rejected");

  const parentBlock = element.parentElement;
  if (parentBlock.lastChild.className == "car-form__validation-error") {
    while (parentBlock.lastChild.className == "car-form__validation-error") {
      parentBlock.removeChild(parentBlock.lastChild);
    }
  }
};

const renderCreateForm = e => {
  [...carForm].map(element => resetError(element));
  toggleCarModal();

  carFormTitle.innerText = `Add car`;
  yearField.removeAttribute("disabled");

  deleteCarBtn.classList.add("hidden");
  updateCarBtn.classList.add("hidden");
  createCarBtn.classList.remove("hidden");

  createCarBtn.innerText = "Add";
  createCarBtn.classList.add("primary");
  createCarBtn.setAttribute("type", "button");
  createCarBtn.addEventListener("click", createCar);

  formBtns.appendChild(createCarBtn);

  carFormTitle.innerText = `Add car`;
  yearField.removeAttribute("disabled");

  carForm.elements.body_type_id.value = "";
  carForm.elements.make_id.value = "";
  carForm.elements.year.value = "";
  carForm.elements.car_model_id.value = "";
  carForm.elements.mileage.value = "";
  carForm.elements.description.value = "";
};

const renderUpdateForm = (e, car) => {
  [...carForm].map(element => resetError(element));
  toggleCarModal();

  carFormTitle.innerText = `Update car №${car.id}`;

  carForm.elements.body_type_id.value = car.body_type_id;
  carForm.elements.make_id.value = car.make_id;
  carForm.elements.year.value = car.year;
  carForm.elements.car_model_id.value = car.car_model_id;
  carForm.elements.mileage.value = car.mileage;
  carForm.elements.description.value = car.description;

  yearField.setAttribute("disabled", true);
  deleteCarBtn.innerText = "Delete";
  deleteCarBtn.classList.add("delete");

  formBtns.appendChild(updateCarBtn);
  formBtns.appendChild(deleteCarBtn);

  createCarBtn.classList.add("hidden");
  deleteCarBtn.classList.remove("hidden");
  updateCarBtn.classList.remove("hidden");

  deleteCarBtn.innerText = "Delete";
  deleteCarBtn.classList.add("delete");
  deleteCarBtn.setAttribute("type", "button");

  updateCarBtn.innerText = "Update";
  updateCarBtn.classList.add("edit");
  updateCarBtn.setAttribute("type", "button");

  updateCarBtn.addEventListener("click", e => updateCar(e, car.id));
  deleteCarBtn.addEventListener("click", e => deleteCar(e, car.id));
};

const renderSignInForm = e => {
  authFormTitle.innerText = "Sign in";
  authFormBtn.innerText = "Login";
  toggleAuthModal();
};

const renderRegisterForm = e => {
  authFormTitle.innerText = "Register";
  authFormBtn.innerText = "Create user";
  toggleAuthModal();
};

//save the search text
searchInput.addEventListener("keydown", e => (searchQuery = e.target.value));

searchBar.addEventListener("submit", searchData);

nextPageArrow.addEventListener("click", getNextPage);
prevPageArrow.addEventListener("click", getPreviousPage);

//listners for sort query
producerSortFilter.addEventListener("change", e => sortList("make.name", e));

modelSortFilter.addEventListener("change", e => sortList("car_model.name", e));

bodyTypeSortFilter.addEventListener("change", e =>
  sortList("body_type.name", e)
);

yearSortFilter.addEventListener("change", e => sortList("year", e));

mileageSortFilter.addEventListener("change", e => sortList("mileage", e));

descriptionSortFilter.addEventListener("change", e =>
  sortList("description", e)
);

createdSortFilter.addEventListener("change", e => sortList("created_at", e));

updatedSortFilter.addEventListener("change", e => sortList("updated_at", e));

toggleCreateFormBtn.addEventListener("click", renderCreateForm);

modalCloser.addEventListener("click", toggleCarModal);

toggleSignInModalBtn.addEventListener("click", renderSignInForm);

togglRegisterModalBtn.addEventListener("click", renderRegisterForm);

// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */

// eslint-disable-next-line import/extensions
import { CarService } from './carsServiceXHR.js';

// table elements
const tableBodyElement = document.querySelector('.cars-list__body');

// modal-related elements
const toggleCreateFormBtn = document.querySelector('#add-car-btn');
const toggleSignInModalBtn = document.querySelector('#sign-in-toggle-btn');
const togglRegisterModalBtn = document.querySelector('#register-toggle-btn');

// paginator elements
const prevPageArrow = document.querySelector('#prev-page-arrow');
const nextPageArrow = document.querySelector('#next-page-arrow');
const totalPagesElement = document.querySelector('.pages__total');
const currentPageElement = document.querySelector('.pages__current');

// searchbar elements
const searchBar = document.querySelector('#header__search-bar');
const searchInput = document.querySelector('#search-input');

// dynamic form elements
const carFormTitle = document.querySelector('#car-form__title');
const formBtns = document.querySelector('.car-form__btns');

// table filter elements
const producerSortFilter = document.querySelector('#producer-filter');
const modelSortFilter = document.querySelector('#model-filter');
const bodyTypeSortFilter = document.querySelector('#body-type-filter');
const yearSortFilter = document.querySelector('#year-filter');
const mileageSortFilter = document.querySelector('#mileage-filter');
const descriptionSortFilter = document.querySelector('#description-filter');
const createdSortFilter = document.querySelector('#created-filter');
const updatedSortFilter = document.querySelector('#updated-filter');

// elements of authentication form
const authFormTitle = document.querySelector('.authentication-form__title');
const authFormBtn = document.querySelector('.authentication-form__button');

// modal-related elements
const carModalWrapper = document.querySelector('#car-modal-wrapper');
const authModalWrapper = document.querySelector('#authentication-modal-wrapper');

// forms element
const carForm = document.querySelector('.car-form');
const authForm = document.querySelector('.authentication-form');

const bodyElement = document.querySelector('body');

// year field in table
const yearField = carForm.elements.year;

// service provide api methods
const carService = new CarService();

let cars = [];
let searchQuery = '';
let sortBy;
let sortOrder = '';

// btns on car form
const createCarBtn = document.createElement('button');
let deleteCarBtn = document.createElement('button');
let updateCarBtn = document.createElement('button');

/**
 * Method to push snackbar with sended message.
 *
 * @param {string} message Message text need to show in snackbar.
 */
const pushSnackbar = message => {
  const errorDiv = document.createElement('div');

  errorDiv.innerText = message;
  errorDiv.classList.add('cars-list__error-msg');
  document.querySelector('body').appendChild(errorDiv);

  setTimeout(() => errorDiv.remove(), 2000);
};

/**
 * Reset validation error on input element.
 *
 * @param {Object} element Input DOM element.
 */
const resetError = element => {
  element.classList.remove('rejected');

  const parentBlock = element.parentElement;

  if (parentBlock.lastChild.className === 'car-form__validation-error') {
    while (parentBlock.lastChild.className === 'car-form__validation-error') {
      parentBlock.removeChild(parentBlock.lastChild);
    }
  }
};

/**
 * Check document on opened modals.
 *
 * @param {Object} element Input modal DOM element.
 */
const checkForOpenModal = element => {
  // eslint-disable-next-line no-unused-expressions
  element.classList.contains('hidden')
    ? bodyElement.classList.remove('modal-opened')
    : bodyElement.classList.add('modal-opened');
};

/**
 * Show / hide authentication moadl window and set
 * to the body DOM element class "modal-opened".
 */
const toggleAuthModal = () => {
  authModalWrapper.classList.toggle('hidden');
  checkForOpenModal(authModalWrapper);
};

/**
 * Show / hide modal window.
 */
const toggleCarModal = () => {
  carModalWrapper.classList.toggle('hidden');
  checkForOpenModal(carModalWrapper);
};

/**
 * Style input red red color if it's invalid.
 *
 * @param {Object} element DOM element need to append validation error.
 * @param {string} message Error message need to show.
 */
const rejectField = (element, message) => {
  element.classList.add('rejected');

  const error = document.createElement('div');

  error.innerText = message;
  error.classList.add('car-form__validation-error');
  element.parentElement.appendChild(error);
};

/**
 * Validate car form on required fields and year range.
 *
 * @returns {number} Return index of validation status:
 *                   If it "0" - OK, "-1" - validation error.
 */
const validateCarForm = () => {
  const { year } = carForm.elements;

  const currentYear = new Date().getFullYear();

  let index = 0;

  [...carForm].map(element => resetError(element));

  // eslint-disable-next-line array-callback-return
  [...carForm].map(element => {
    if (element.tagName !== 'BUTTON' && !element.value) {
      rejectField(element, 'field is empty');
      index = -1;
    }
  });

  if (year.value < 1900 || year.value > currentYear) {
    rejectField(year, `1900 < year < ${currentYear}`);
    index = -1;
  }

  return index;
};

/**
 *  Update car method.
 *
 * @param {number} carId Id of car object.
 */
const updateCar = carId => {
  const validation = validateCarForm();

  if (validation === 0) {
    const bodyTypeElement = carForm.elements.body_type_id;
    const makeElement = carForm.elements.make_id;
    const yearElement = carForm.elements.year;
    const carModelElement = carForm.elements.car_model_id;
    const mileageElement = carForm.elements.mileage;
    const descriptionElement = carForm.elements.description;

    const data = {
      body_type_id: bodyTypeElement.value,
      make_id: makeElement.value,
      year: yearElement.value,
      car_model_id: carModelElement.value,
      mileage: mileageElement.value,
      description: descriptionElement.value,
    };

    carService
      .updateCar(carId, data)
      .then(() => {
        carModalWrapper.classList.add('hidden');

        const updatedElement = document.querySelector(`[data-id='${carId}']`).children;

        [...updatedElement].map(rowElement => {
          switch (rowElement.getAttribute('data-name')) {
            case 'make':
              rowElement.innerHTML = makeElement.options[makeElement.selectedIndex].text;
              break;

            case 'model':
              rowElement.innerHTML = carModelElement.options[carModelElement.selectedIndex].text;
              break;

            case 'bodyType':
              rowElement.innerHTML = bodyTypeElement.options[bodyTypeElement.selectedIndex].text;
              break;

            case 'mileage':
              rowElement.innerHTML = mileageElement.value;
              break;

            case 'description':
              rowElement.innerHTML = descriptionElement.value;
              break;

            default:
              break;
          }

          return pushSnackbar(`Car №${carId} was updated`);
        });
      })
      .catch(error => pushSnackbar(error));
  }
};

/**
 * Delete car method.
 *
 * @param {number} carId Id of car object.
 */
const deleteCar = carId => {
  carService
    .deleteCar(carId)
    .then(() => {
      const carElement = document.querySelector(`[data-id='${carId}']`);

      if (!carElement) return;

      pushSnackbar(`Car №${carId} was deleted`);
      carModalWrapper.classList.add('hidden');

      carElement.remove();
    })
    .catch(error => pushSnackbar(error));
};

/**
 * Prepare and show update form.
 *
 * @param {Object} car Car object instance:
 *    {id, body_type_id, make_id, car_model_id, year, description,
 *    created_at, updated_at, mileage, car_model: {id, make_id, name},
 *    body_type: {id, name}, make {id, name}}.
 */
const renderUpdateForm = car => {
  [...carForm].map(element => resetError(element));
  toggleCarModal();

  const cloneDeleteBtn = deleteCarBtn.cloneNode(true);

  deleteCarBtn.remove();
  deleteCarBtn = cloneDeleteBtn;

  const cloneUpdateBtn = updateCarBtn.cloneNode(true);

  updateCarBtn.remove();
  updateCarBtn = cloneUpdateBtn;

  carFormTitle.innerText = `Update car №${car.id}`;

  carForm.elements.body_type_id.value = car.body_type_id;
  carForm.elements.make_id.value = car.make_id;
  carForm.elements.year.value = car.year;
  carForm.elements.car_model_id.value = car.car_model_id;
  carForm.elements.mileage.value = car.mileage;
  carForm.elements.description.value = car.description;

  yearField.setAttribute('disabled', true);
  deleteCarBtn.innerText = 'Delete';
  deleteCarBtn.classList.add('delete');

  formBtns.appendChild(updateCarBtn);
  formBtns.appendChild(deleteCarBtn);

  createCarBtn.classList.add('hidden');
  deleteCarBtn.classList.remove('hidden');
  updateCarBtn.classList.remove('hidden');

  deleteCarBtn.innerText = 'Delete';
  deleteCarBtn.classList.add('delete');
  deleteCarBtn.setAttribute('type', 'button');

  updateCarBtn.innerText = 'Update';
  updateCarBtn.classList.add('edit');
  updateCarBtn.setAttribute('type', 'button');

  updateCarBtn.addEventListener('click', () => updateCar(car.id));
  deleteCarBtn.addEventListener('click', () => deleteCar(car.id));
};

/**
 * FIll the row of table car data.
 *
 * @param {Object} car Car object instance:
 *    {id, body_type_id, make_id, car_model_id, year, description,
 *    created_at, updated_at, mileage, car_model: {id, make_id, name},
 *    body_type: {id, name}, make {id, name}}.
 */
const appendCarInstanceInTable = car => {
  const tr = document.createElement('tr');

  tr.setAttribute('data-id', car.id);

  const make = document.createElement('th');

  make.innerHTML = car.make.name;
  make.addEventListener('click', () => renderUpdateForm(car));
  make.setAttribute('data-name', 'make');
  tr.appendChild(make);

  const model = document.createElement('th');

  model.innerText = car.car_model.name;
  model.addEventListener('click', () => renderUpdateForm(car));
  model.setAttribute('data-name', 'model');
  tr.appendChild(model);

  const bodyType = document.createElement('th');

  bodyType.innerText = car.body_type.name;
  bodyType.addEventListener('click', () => renderUpdateForm(car));
  bodyType.setAttribute('data-name', 'bodyType');
  tr.appendChild(bodyType);

  const year = document.createElement('th');

  year.innerText = car.year;
  tr.appendChild(year);

  const mileage = document.createElement('th');

  mileage.innerText = car.mileage;
  mileage.setAttribute('data-name', 'mileage');
  tr.appendChild(mileage);

  const description = document.createElement('th');

  description.innerText = car.description;
  description.setAttribute('data-name', 'description');
  tr.appendChild(description);

  const createdAt = document.createElement('th');

  // eslint-disable-next-line no-undef
  createdAt.innerText = moment(car.createdAt).format('DD.MM.YYYY h:mm');
  tr.appendChild(createdAt);

  const updatedAt = document.createElement('th');

  // eslint-disable-next-line no-undef
  updatedAt.innerText = moment(car.updatedAt).format('DD.MM.YYYY h:mm');
  tr.appendChild(updatedAt);

  tableBodyElement.appendChild(tr);
};

/**
 * Common method for render list of cars data.
 *
 * @param {Object} carsData Cata obout cars: {results:[cars array],
 *                          pagination: {current_page, total_pages}}.
 */
const renderTable = carsData => {
  while (tableBodyElement.firstChild) {
    tableBodyElement.removeChild(tableBodyElement.firstChild);
  }
  if (!carsData) return;

  cars = [...carsData.results];

  const paginationData = carsData.pagination;

  currentPageElement.innerText = paginationData.current_page;

  // eslint-disable-next-line no-unused-expressions
  paginationData.current_page === 1
    ? prevPageArrow.setAttribute('disabled', true)
    : prevPageArrow.removeAttribute('disabled', true);

  totalPagesElement.innerText = paginationData.total_pages;

  // eslint-disable-next-line no-unused-expressions
  paginationData.total_pages === parseInt(currentPageElement.innerText, 10)
    ? nextPageArrow.setAttribute('disabled', true)
    : nextPageArrow.removeAttribute('disabled', true);

  // fill table
  cars.map(car => appendCarInstanceInTable(car));
};

// initial showing data
carService
  .getCars()
  .then(data => renderTable(data))
  .catch(error => pushSnackbar(error));

/**
 * Find method.
 *
 * @param {Event} e Submit search form event.
 */
const searchData = e => {
  e.preventDefault();
  carService
    .getCars(sortBy, sortOrder, 1, e.target.elements.queryText.value)
    .then(data => renderTable(data))
    .catch(error => pushSnackbar(error));
};

/**
 * Get next page when click next page arrow.
 */
const goToNextPage = () => {
  carService
    .getCars(sortBy, sortOrder, parseInt(currentPageElement.innerText, 10) + 1, searchQuery)
    .then(data => renderTable(data))
    .catch(error => pushSnackbar(error));
};

/**
 * Get previous page when click next page arrow.
 */
const goToPreviousPage = () => {
  carService
    .getCars(sortBy, sortOrder, parseInt(currentPageElement.innerText, 10) - 1, searchQuery)
    .then(data => renderTable(data))
    .catch(error => pushSnackbar(error));
};

/**
 *  Sort all cars by field in selected order.
 *
 * @param {string} field Field name which will be sorted.
 * @param {Event} e Click event on sort order.
 */
const sortList = (field, e) => {
  sortBy = field;
  sortOrder = e.target.value;
  searchQuery = '';

  carService
    .getCars(sortBy, sortOrder, 1, '')
    .then(data => renderTable(data))
    .catch(error => pushSnackbar(error));
};

/**
 * Create car based on input data in car form.
 */
const createCar = () => {
  const validation = validateCarForm();

  if (validation === 0) {
    const car = {
      body_type_id: carForm.elements.body_type_id.value,
      make_id: carForm.elements.make_id.value,
      car_model_id: carForm.elements.car_model_id.value,
      year: carForm.elements.year.value,
      description: carForm.description.value,
      mileage: carForm.mileage.value,
    };

    carService
      .createCar(car)
      .then(() => {
        pushSnackbar('Created');
        carModalWrapper.classList.add('hidden');
      })
      .catch(error => pushSnackbar(error));
  }
};

/**
 * Prepare and show create car form.
 */
const renderCreateForm = () => {
  [...carForm].map(element => resetError(element));
  toggleCarModal();

  carFormTitle.innerText = `Add car`;
  yearField.removeAttribute('disabled');

  deleteCarBtn.classList.add('hidden');
  updateCarBtn.classList.add('hidden');
  createCarBtn.classList.remove('hidden');

  createCarBtn.innerText = 'Add';
  createCarBtn.classList.add('primary');
  createCarBtn.setAttribute('type', 'button');
  createCarBtn.addEventListener('click', createCar);

  formBtns.appendChild(createCarBtn);

  carFormTitle.innerText = 'Add car';
  yearField.removeAttribute('disabled');

  carForm.elements.body_type_id.value = '';
  carForm.elements.make_id.value = '';
  carForm.elements.year.value = '';
  carForm.elements.car_model_id.value = '';
  carForm.elements.mileage.value = '';
  carForm.elements.description.value = '';
};

/**
 * Prepare and show sign in form.
 */
const renderSignInForm = () => {
  authFormTitle.innerText = 'Sign in';
  authFormBtn.innerText = 'Login';
  toggleAuthModal();
};

/**
 * Prepare and show registration form.
 */
const renderRegisterForm = () => {
  authFormTitle.innerText = 'Register';
  authFormBtn.innerText = 'Create user';
  toggleAuthModal();
};

/**
 * Write input value in variable to use it in several methods.
 *
 * @param {Event} e Input event of search dorm.
 */
const setSearchQueryValue = e => {
  searchQuery = e.target.value;
};

// save the search text in variable
searchInput.addEventListener('keydown', setSearchQueryValue);

// event listner for make search request
searchBar.addEventListener('submit', searchData);

// pagination request events
nextPageArrow.addEventListener('click', goToNextPage);
prevPageArrow.addEventListener('click', goToPreviousPage);

// listners for sort query
producerSortFilter.addEventListener('change', e => sortList('make.name', e));
modelSortFilter.addEventListener('change', e => sortList('car_model.name', e));
bodyTypeSortFilter.addEventListener('change', e => sortList('body_type.name', e));
yearSortFilter.addEventListener('change', e => sortList('year', e));
mileageSortFilter.addEventListener('change', e => sortList('mileage', e));
descriptionSortFilter.addEventListener('change', e => sortList('description', e));
createdSortFilter.addEventListener('change', e => sortList('created_at', e));
updatedSortFilter.addEventListener('change', e => sortList('updated_at', e));
toggleCreateFormBtn.addEventListener('click', renderCreateForm);
toggleSignInModalBtn.addEventListener('click', renderSignInForm);
togglRegisterModalBtn.addEventListener('click', renderRegisterForm);

// close modal on key "escape"
window.addEventListener('keydown', e => {
  if (e.keyCode === 27 && !carModalWrapper.classList.contains('hidden')) toggleCarModal();

  if (e.keyCode === 27 && !authModalWrapper.classList.contains('hidden')) toggleAuthModal();
});

// close modal on click outside form
carModalWrapper.addEventListener('click', e => {
  const isClickInsideCarForm = carForm.contains(e.target);

  if (!isClickInsideCarForm && !carForm.classList.contains('hidden'))
    carModalWrapper.classList.add('hidden');
});
authModalWrapper.addEventListener('click', e => {
  const isClickInsideAuthForm = authForm.contains(e.target);

  if (!isClickInsideAuthForm && !authForm.classList.contains('hidden'))
    authModalWrapper.classList.add('hidden');
});

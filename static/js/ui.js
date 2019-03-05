// modal-related elements
const toggleCreateFormBtn = document.querySelector("#add-car-btn"),
  carModalWrapper = document.querySelector("#car-modal-wrapper"),
  authModalWrapper = document.querySelector("#authentication-modal-wrapper"),
  toggleSignInModalBtn = document.querySelector("#sign-in-toggle-btn"),
  togglRegisterModalBtn = document.querySelector("#register-toggle-btn");

// forms element
const carForm = document.querySelector(".car-form");
const authForm = document.querySelector(".authentication-form");

const bodyElement = document.querySelector("body");

// method to push snackbar with sended message
const snackbar = message => {
  const errorDiv = document.createElement("div");
  errorDiv.innerText = message;
  errorDiv.classList.add("cars-list__error-msg");
  document.querySelector("body").appendChild(errorDiv);

  setTimeout(() => errorDiv.remove(), 2000);
};

// close modal on click outside form
carModalWrapper.addEventListener("click", e => {
  const isClickInsideCarForm = carForm.contains(e.target);

  if (!isClickInsideCarForm && !carForm.classList.contains("hidden")) {
    carModalWrapper.classList.add("hidden");
  }
});
authModalWrapper.addEventListener("click", e => {
  const isClickInsideAuthForm = authForm.contains(e.target);

  if (!isClickInsideAuthForm && !authForm.classList.contains("hidden")) {
    authModalWrapper.classList.add("hidden");
  }
});

// show/hide modals
const toggleCarModal = () => {
  carModalWrapper.classList.toggle("hidden");
  checkForOpenModal(carModalWrapper);
};
const toggleAuthModal = () => {
  authModalWrapper.classList.toggle("hidden");
  checkForOpenModal(authModalWrapper);
};

// check document on opened modals
const checkForOpenModal = element => {
  element.classList.contains("hidden")
    ? bodyElement.classList.remove("modal-opened")
    : bodyElement.classList.add("modal-opened");
};

// close modal on key "escape"
window.addEventListener("keydown", e => {
  if (e.keyCode === 27 && !carModalWrapper.classList.contains("hidden")) {
    toggleCarModal();
  }
  if (e.keyCode === 27 && !authModalWrapper.classList.contains("hidden")) {
    toggleAuthModal();
  }
});

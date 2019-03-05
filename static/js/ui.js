const toggleCreateFormBtn = document.querySelector("#add-car-btn"),
  carModalWrapper = document.querySelector("#car-modal-wrapper"),
  authModalWrapper = document.querySelector("#authentication-modal-wrapper"),
  modalCloser = document.querySelector(".car-form__closer"),
  toggleSignInModalBtn = document.querySelector("#sign-in-toggle-btn"),
  togglRegisterModalBtn = document.querySelector("#register-toggle-btn");

const snackbar = message => {
  const errorDiv = document.createElement("div");
  errorDiv.innerText = message;
  errorDiv.classList.add("cars-list__error-msg");
  document.querySelector("body").appendChild(errorDiv);

  setTimeout(() => errorDiv.remove(), 3000);
};

const toggleCarModal = () => carModalWrapper.classList.toggle("hidden");
const toggleAuthModal = () => authModalWrapper.classList.toggle("hidden");

window.addEventListener("keydown", e => {
  if (e.keyCode === 27 && !carModalWrapper.classList.contains("hidden")) {
    toggleCarModal();
  }
  if (e.keyCode === 27 && !authModalWrapper.classList.contains("hidden")) {
    toggleAuthModal();
  }
});

//push markup error if 503 status
const snackbar = message => {
  const errorDiv = document.createElement("div");
  errorDiv.innerText = message;
  errorDiv.classList.add("cars-list__error-msg");
  document.querySelector("body").appendChild(errorDiv);

  setTimeout(() => errorDiv.remove(), 3000);
};

const toggleModal = () => modalWrapper.classList.toggle("hidden");

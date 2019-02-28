const toggleCreateForm = document.querySelector("#add-car-btn");
const modalWrapper = document.querySelector(".modal-wrapper");
const submitBtn = document.querySelector("#form-submit-btn");
const addCarForm = document.querySelector(".add-car-form");

const toggleCreateCarModal = e => {
  if (e.target.closest(".add-car-form")) return;

  modalWrapper.classList.toggle("hidden");
};

toggleCreateForm.addEventListener("click", toggleCreateCarModal);
modalWrapper.addEventListener("click", toggleCreateCarModal);

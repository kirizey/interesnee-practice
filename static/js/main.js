let toggleCreateForm = document.querySelector("#add-car-btn");
let modalWrapper = document.querySelector(".modal-wrapper");

let toggleCreateCarModal = e => {
  if (e.target.closest(".add-car-form")) return;

  modalWrapper.classList.toggle("hidden");
};

toggleCreateForm.addEventListener("click", toggleCreateCarModal);
modalWrapper.addEventListener("click", toggleCreateCarModal);

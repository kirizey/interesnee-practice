class CarService {
  API_URL = "https://backend-jscamp.saritasa-hosting.com/api/cars";

  getCars = (page = 1, searchQuery = "", orderBy, sortOrder = "asc") => {
    const xhr = new XMLHttpRequest();

    if (orderBy) {
      xhr.open(
        "GET",
        `${
          this.API_URL
        }?page=${page}&keyword=${searchQuery}&order_by=${orderBy}&sort_order=${sortOrder}`,
        false
      );
      xhr.send();
    } else {
      xhr.open(
        "GET",
        `${this.API_URL}?page=${page}&keyword=${searchQuery}`,
        false
      );
      xhr.send();
    }

    return JSON.parse(xhr.response);
  };

  createCar = data => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.API_URL, false);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
    return xhr;
  };

  updateCar = (carId, data) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${this.API_URL}/${carId}`, false);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
    return xhr;
  };

  deleteCar = carId => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${this.API_URL}/${carId}`);
    xhr.send();
    if (xhr.status !== 400 && xhr.status !== 503) {
      return xhr;
    }
  };
}

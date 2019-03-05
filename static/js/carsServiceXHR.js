class CarService {
  API_URL = "https://backend-jscamp.saritasa-hosting.com/api/cars";

  getCars = (page = 1, searchQuery = "", orderBy, sortOrder = "asc") => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (orderBy) {
        xhr.open(
          "GET",
          `${
            this.API_URL
          }?page=${page}&keyword=${searchQuery}&order_by=${orderBy}&sort_order=${sortOrder}`,
          false
        );
        xhr.onload = () => {
          if (xhr.status == 200 && xhr.readyState === 4) {
            resolve(JSON.parse(xhr.response));
          } else {
            var error = new Error(xhr.status);
            console.log(xhr.status);
            error.code = xhr.status;
            reject(error);
          }
          xhr.onerror = () => {
            reject(new Error("Network Error"));
          };
        };
        xhr.send();
      } else {
        xhr.open(
          "GET",
          `${this.API_URL}?page=${page}&keyword=${searchQuery}`,
          false
        );
        xhr.onload = () => {
          if (xhr.status == 200 && xhr.readyState === 4) {
            resolve(JSON.parse(xhr.response));
          } else {
            var error = new Error(xhr.status);
            error.code = xhr.status;
            reject(error);
          }
        };

        xhr.onerror = () => {
          reject(new Error("Network Error"));
        };

        xhr.send();
      }
    });
  };

  createCar = data => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", this.API_URL, false);
      xhr.setRequestHeader("content-type", "application/json");

      xhr.onload = () => {
        if (xhr.status == 200 && xhr.readyState === 4) {
          resolve(xhr.status);
        } else {
          var error = new Error(xhr.status);
          error.code = xhr.status;
          reject(error);
        }
      };

      xhr.send(JSON.stringify(data));
    });
  };

  updateCar = (carId, data) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `${this.API_URL}/${carId}`, false);
      xhr.setRequestHeader("content-type", "application/json");

      xhr.onload = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
          resolve(xhr.status);
        } else {
          var error = new Error(xhr.status);
          error.code = xhr.status;
          reject(error);
        }
      };
      xhr.send(JSON.stringify(data));
    });
  };

  deleteCar = carId => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `${this.API_URL}/${carId}`);

      xhr.onload = () => {
        if (xhr.status === 204 && xhr.readyState === 4) {
          resolve(xhr.status);
        } else {
          var error = new Error(xhr.status);
          error.code = xhr.status;
          reject(error);
        }
      };

      xhr.send();
    });
  };
}

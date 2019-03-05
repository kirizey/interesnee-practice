class CarService {
  API_URL = "https://backend-jscamp.saritasa-hosting.com/api/cars";

  getCars = (page = 1, searchQuery = "", orderBy, sortOrder = "asc") => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const orderParam = orderBy
        ? `&order_by=${orderBy}&sort_order=${sortOrder}`
        : "";

      xhr.open(
        "GET",
        `${this.API_URL}?page=${page}&keyword=${searchQuery}${orderParam}`,
        false
      );

      xhr.onload = () => {
        if (xhr.status == 200 && xhr.readyState === 4) {
          resolve(JSON.parse(xhr.response));
        } else {
          var error = new NetworkError(xhr.status);
          error.code = xhr.status;
          reject(error);
        }
      };

      xhr.send();
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        if (error.code === 503) {
          return this.getCars(page, searchQuery, orderBy, sortOrder);
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
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        if (error.code === 503) {
          return this.createCar(data);
        }
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
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        if (error.code === 503) {
          return this.updateCar(carId, data);
        }
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
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        if (error.code === 503) {
          return this.deleteCar(carId);
        }
        if (error.code === 404) {
          throw new Error("Element was deleted...");
        }
      });
  };
}
// class NetworkError extends Error {
//   constructor(...args) {
//     super(...args);
//     Error.captureStackTrace(this, NetworkError);
//   }
// }

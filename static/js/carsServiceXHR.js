/**
 * Create an error mathod.
 *
 * @param {number} status Error status.
 * @returns {Error} Return error.
 */
const pushError = status => {
  const error = new Error(status);

  error.code = status;

  return error;
};

/**
 * Method set to api using XMLHttpRequest
 */
export class CarService {
  /**
   * Costant api endpoint.
   */
  constructor() {
    this.apiUrl = 'https://backend-jscamp.saritasa-hosting.com/api/cars';
  }

  /**
   * Common get cars data method call too api.
   *
   * @param {number} page Page number need to get.
   * @param {string} searchQuery Keyword need to search and get data.
   * @param {string} orderBy Name of field need to get.
   * @param {string} sortOrder Sort order.
   * @returns {Promise} Resolve - cars data, Reject - error and retry request.
   */
  getCars(page = 1, searchQuery = '', orderBy, sortOrder = 'asc') {
    return (
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        const orderParam = orderBy ? `&order_by=${orderBy}&sort_order=${sortOrder}` : '';

        xhr.open('GET', `${this.apiUrl}?page=${page}&keyword=${searchQuery}${orderParam}`, false);

        xhr.onload = () => {
          // eslint-disable-next-line no-unused-expressions
          xhr.status === 200 && xhr.readyState === 4
            ? resolve(JSON.parse(xhr.response))
            : reject(pushError(xhr.status));
        };

        xhr.send();
      })
        .then(response => response)
        // eslint-disable-next-line consistent-return
        .catch(error => {
          if (error.code === 503) return this.getCars(page, searchQuery, orderBy, sortOrder);
        })
    );
  }

  /**
   * Common create car method call too api.
   *
   * @param {Object} data Request body, need to POST: { body_type_id,
   * make_id, carr_model_id, year, description, mileage}.
   * @returns {Promise} Resolve - status: "200" - OK, Reject - error and retry request.
   */
  createCar(data) {
    return (
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', this.apiUrl, false);
        xhr.setRequestHeader('content-type', 'application/json');

        xhr.onload = () => {
          // eslint-disable-next-line no-unused-expressions
          xhr.status === 200 && xhr.readyState === 4
            ? resolve(xhr.status)
            : reject(pushError(xhr.status));
        };

        xhr.send(JSON.stringify(data));
      })
        .then(response => response)
        // eslint-disable-next-line consistent-return
        .catch(error => {
          if (error.code === 503) return this.createCar(data);
        })
    );
  }

  /**
   * Common update car data method call too api.
   *
   * @param {number} carId Id of car need to update.
   * @param {Object} data Object of fields and values need to update.
   * @returns {Promise} Resolve - status: "200" - OK, Reject - error and retry request.
   */
  updateCar(carId, data) {
    return (
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${this.apiUrl}/${carId}`, false);
        xhr.setRequestHeader('content-type', 'application/json');

        xhr.onload = () => {
          // eslint-disable-next-line no-unused-expressions
          xhr.status === 200 && xhr.readyState === 4
            ? resolve(xhr.status)
            : reject(pushError(xhr.status));
        };
        xhr.send(JSON.stringify(data));
      })
        .then(response => response)
        // eslint-disable-next-line consistent-return
        .catch(error => {
          if (error.code === 503) return this.updateCar(carId, data);
        })
    );
  }

  /**
   * Common delete car method call too api.
   *
   * @param {number} carId Id of car need to delete.
   * @returns {Promise} Resolve - status: "204" - deleted, Reject - error and retry request.
   */
  deleteCar(carId) {
    return (
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('DELETE', `${this.apiUrl}/${carId}`);

        xhr.onload = () => {
          // eslint-disable-next-line no-unused-expressions
          (xhr.status === 204 || xhr.status === 200) && xhr.readyState === 4
            ? resolve(xhr.status)
            : reject(pushError(xhr.status));
        };

        xhr.send();
      })
        .then(response => response)
        // eslint-disable-next-line consistent-return
        .catch(error => {
          if (error.code === 503) return this.deleteCar(carId);

          if (error.code === 404) throw new Error('Element was deleted...');
        })
    );
  }
}

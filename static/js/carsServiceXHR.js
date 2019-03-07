// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-expressions */
/**
 * Create an error method.
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
 * Common handler for XHR methods.
 *
 * @param {string} method Request type.
 * @param {string} endpoint Url where request is sending.
 * @param {Object} headers Headers for request.
 * @param {number} expectedStatus What status we waiting in result.
 * @param {Object} data Sending data if it necessary.
 * @returns {Promise} Return promise.
 */
const sendXHR = (method, endpoint, headers, expectedStatus, data) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, endpoint, false);

    if (headers) xhr.setRequestHeader(headers.type, headers.value);

    xhr.onload = () => {
      xhr.status === expectedStatus && xhr.readyState === 4
        ? resolve(xhr.status)
        : reject(pushError(xhr.status));
    };

    method === 'DELETE' ? xhr.send() : xhr.send(JSON.stringify(data));
  });

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
   * @param {string} orderBy Name of field need to get.
   * @param {string} sortOrder Sort order.
   * @param {number} page Page number need to get.
   * @param {string} searchQuery Keyword need to search and get data.
   * @returns {Promise} Resolve - cars data, Reject - error and retry request.
   */
  getCars(orderBy, sortOrder = 'asc', page = 1, searchQuery = '') {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const searchParams = new URLSearchParams();

      searchParams.append('page', page);
      searchParams.append('keyword', searchQuery);
      if (orderBy) {
        searchParams.append('order_by', orderBy);
        searchParams.append('sort_order', sortOrder);
      }

      xhr.open('GET', `${this.apiUrl}?${searchParams}`, false);

      xhr.onload = () => {
        xhr.status === 200 && xhr.readyState === 4
          ? resolve(JSON.parse(xhr.response))
          : reject(pushError(xhr.status));
      };

      xhr.send();
    })
      .then(response => response)
      .catch(error => {
        if (error.code === 503) return this.getCars(orderBy, sortOrder, page, searchQuery);

        return pushError(400);
      });
  }

  /**
   * Common create car method call too api.
   *
   * @param {Object} data Request body, need to POST: { body_type_id,
   * make_id, carr_model_id, year, description, mileage}.
   * @returns {Promise} Resolve - status: "200" - OK, Reject - error and retry request.
   */
  createCar(data) {
    return sendXHR(
      'POST',
      this.apiUrl,
      { type: 'content-type', value: 'application/json' },
      200,
      data,
    )
      .then(response => response)
      .catch(error => {
        if (error.code === 503) return this.createCar(data);

        return pushError(400);
      });
  }

  /**
   * Common update car data method call too api.
   *
   * @param {number} carId Id of car need to update.
   * @param {Object} data Object of fields and values need to update.
   * @returns {Promise} Resolve - status: "200" - OK, Reject - error and retry request.
   */
  updateCar(carId, data) {
    return sendXHR(
      'PUT',
      `${this.apiUrl}/${carId}`,
      { type: 'content-type', value: 'application/json' },
      200,
      data,
    )
      .then(response => response)
      .catch(error => {
        if (error.code === 503) return this.updateCar(carId, data);

        return pushError(400);
      });
  }

  /**
   * Common delete car method call too api.
   *
   * @param {number} carId Id of car need to delete.
   * @returns {Promise} Resolve - status: "204" - deleted, Reject - error and retry request.
   */
  deleteCar(carId) {
    return sendXHR('DELETE', `${this.apiUrl}/${carId}`, '', 204)
      .then(response => response)
      .catch(error => {
        if (error.code === 503) return this.deleteCar(carId);

        return pushError(400);
      });
  }
}

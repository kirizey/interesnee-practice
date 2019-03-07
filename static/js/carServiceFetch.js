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
 * @param {string} method Request type. GET, POST, PUT, DELETE, etc.
 * @param {string} endpoint Url where request is sending.
 * @param {Object} data Sending data if it necessary.
 * @param {Object} options Search params for GET request.
 * @returns {Promise} Return promise.
 */
const sendFetch = (method, endpoint, data, options) =>
  new Promise((resolve, reject) => {
    const requestHeaders = new Headers();
    const stringifiedData = JSON.stringify(data);

    if (method === 'POST' || method === 'PUT') {
      requestHeaders.append('content-type', 'application/json');
    }

    if (method === 'GET') {
      const searchParams = new URLSearchParams();

      searchParams.append('page', options.page);
      searchParams.append('keyword', options.searchQuery);

      if (options.orderBy) {
        searchParams.append('order_by', options.orderBy);
        searchParams.append('sort_order', options.sortOrder);
      }
      endpoint += `?${searchParams}`;
    }

    method === 'GET'
      ? fetch(endpoint, { method }).then(result => {
          if (result.ok) {
            return resolve(result.json());
          }

          return reject(result.status);
        })
      : fetch(endpoint, { method, headers: requestHeaders, body: stringifiedData }).then(result => {
          if (result.ok) {
            return resolve(result.json());
          }

          return reject(result.status);
        });
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
    const options = { orderBy, sortOrder, page, searchQuery };

    return sendFetch('GET', this.apiUrl, '', options)
      .then(response => response)
      .catch(error => {
        if (error === 503) return this.getCars(orderBy, sortOrder, page, searchQuery);

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
    return sendFetch('POST', this.apiUrl, data)
      .then(response => response)
      .catch(error => {
        if (error === 503) return this.createCar(data);

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
    return sendFetch('PUT', `${this.apiUrl}/${carId}`, data)
      .then(response => response)
      .catch(error => {
        if (error === 503) return this.updateCar(carId, data);

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
    return sendFetch('DELETE', `${this.apiUrl}/${carId}`)
      .then(response => response)
      .catch(error => {
        if (error === 503) return this.deleteCar(carId);

        return pushError(400);
      });
  }
}

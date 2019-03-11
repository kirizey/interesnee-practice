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
 * @param {string} userToken Token of authenticated user.
 * @param {string} method Request type. GET, POST, PUT, DELETE, etc.
 * @param {string} endpoint Url where request is sending.
 * @param {Object} data Sending data if it necessary.
 * @param {Object} options Search params for GET request.
 * @returns {Promise} Return promise.
 */
const sendFetch = (userToken, method, endpoint, data, options) =>
  new Promise((resolve, reject) => {
    const requestHeaders = new Headers();
    const stringifiedData = JSON.stringify(data);

    requestHeaders.append('Authorization', `Bearer ${userToken}`);
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

      fetch(endpoint, { method, headers: requestHeaders }).then(result => {
        if (result.ok) return resolve(result.json());

        return reject(result.status);
      });
    } else {
      fetch(endpoint, { method, headers: requestHeaders, body: stringifiedData }).then(result => {
        if (result.ok) return resolve(result.json());

        return reject(result.status);
      });
    }
  });

/**
 * Method set to api using XMLHttpRequest
 */
export class CarService {
  /**
   * Costant api endpoint.
   */
  constructor() {
    this.apiUrl = 'https://backend-jscamp.saritasa-hosting.com/api/with-auth/cars';
    this.authUrl = 'https://backend-jscamp.saritasa-hosting.com/api/auth';
  }

  /**
   * Common get cars data method call too api.
   *
   * @param {string} userToken Token of current user.
   * @param {string} orderBy Name of field need to get.
   * @param {string} sortOrder Sort order.
   * @param {number} page Page number need to get.
   * @param {string} searchQuery Keyword need to search and get data.
   * @returns {Promise} Resolve - cars data, Reject - error and retry request.
   */
  getCars(userToken, orderBy, sortOrder = 'asc', page = 1, searchQuery = '') {
    const options = { orderBy, sortOrder, page, searchQuery };

    return sendFetch(userToken, 'GET', this.apiUrl, '', options)
      .then(response => response)
      .catch(error => {
        if (error === 503) return this.getCars(userToken, orderBy, sortOrder, page, searchQuery);

        return pushError(400);
      });
  }

  /**
   * Common create car method call too api.
   *
   * @param {string} userToken Token of current user.
   * @param {Object} data Request body, need to POST: { body_type_id,
   * make_id, carr_model_id, year, description, mileage}.
   * @returns {Promise} Resolve - status: "200" - OK, Reject - error and retry request.
   */
  createCar(userToken, data) {
    return sendFetch(userToken, 'POST', this.apiUrl, data)
      .then(response => response)
      .catch(error => {
        if (error === 503) return this.createCar(userToken, data);

        return pushError(400);
      });
  }

  /**
   * Common update car data method call too api.
   *
   * @param {string} userToken Token of current user.
   * @param {number} carId Id of car need to update.
   * @param {Object} data Object of fields and values need to update.
   * @returns {Promise} Resolve - status: "200" - OK, Reject - error and retry request.
   */
  updateCar(userToken, carId, data) {
    return sendFetch(userToken, 'PUT', `${this.apiUrl}/${carId}`, data)
      .then(response => response)
      .catch(error => {
        if (error === 503) return this.updateCar(userToken, carId, data);

        return pushError(400);
      });
  }

  /**
   * Common delete car method call too api.
   *
   * @param {string} userToken Token of current user.
   * @param {number} carId Id of car need to delete.
   * @returns {Promise} Resolve - status: "204" - deleted, Reject - error and retry request.
   */
  deleteCar(userToken, carId) {
    return sendFetch(userToken, 'DELETE', `${this.apiUrl}/${carId}`)
      .then(response => response)
      .catch(error => {
        if (error === 503) return this.deleteCar(userToken, carId);

        return pushError(400);
      });
  }

  /**
   * Get user token for CRUD methods.
   *
   * @param {Object} authData Input email and password data.
   * @returns {Promise} Resolve - user token, reject - error.
   */
  getUserToken(authData) {
    return sendFetch('', 'POST', this.authUrl, authData)
      .then(response => response)
      .catch(error => {
        if (error === 503) return this.getUserToken(authData);

        return pushError(400);
      });
  }
}

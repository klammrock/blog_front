import 'whatwg-fetch'
import _ from 'lodash'

import {
  isStoredTokenValid, getToken, removeToken,
} from '../jwt'

import * as routes from 'routes'
import FROM_APP_PARAMS from 'utils/router'

/**
 * Request error
 */
export class RequestError extends Error {
  constructor(error) {
    super(error.message || error.error)

    this.errors = error.errors
    this.code = error.code
    this.status = error.status_code || error.statusCode
    // HACK:
    this.status2 = error.status
  }
}

/**
 * Checks response status.
 * If status code is not between 200 and 300 throws an error
 *
 * @param {*} response - http Response object
 * @return {*}           http Response object
 */

export const checkHttpStatus = (res) => {
  if (_.endsWith(res.url, 'login')) {
    return res.ok ? res : res.json()
  }

  if (res.status === 401) {
    removeToken()
    window.location = `${routes.AUTH_LOGIN}?${FROM_APP_PARAMS}=${encodeURIComponent(window.location.pathname)}`
  }

  return res.ok ? res : res.json()
}

/**
 * Parse response body to json
 *
 * @param {*} response - http Response object
 * @return {*}           http Response object
 */
export const parseJSON = (res) => {
  if (res instanceof Response) {
    return res.json()
  }

  throw new RequestError(res)
}

/**
 * Get auth header if token is exist in storage
 */
export function authHeader() {
  return isStoredTokenValid()
    ? { Authorization: `Bearer ${getToken()}` }
    : {}
}

/**
 * Fetch wrapper function
 *
 * @param path    - api endpoint
 * @param options - fetch options
 * @returns       - promise
 */
const apiFetch = (path, options = {}) => fetch(path, {
  headers: {
    'Accept': 'application/json', // eslint-disable-line
    'Content-Type': 'application/json',
    ...authHeader(),
  },
  ...options,
})
  .then(checkHttpStatus)
  .then(parseJSON)


/**
 * Fetch wrapper for GET requests
 *
 * @param {string} path - endpoint
 * @return {*}          - promise
 */
export const get = (path, opts) => (apiFetch(path, {
  ...opts,
  method: 'GET',
}))

/**
 * Fetch wrapper for POST requests
 *
 * @param {string} path - endpoint
 * @param {*} body - POST request body
 * @return {*}     - promise
 */
export const post = (path, body, opts) => (apiFetch(path, {
  ...opts,
  method: 'POST',
  body: JSON.stringify(body),
}))

/**
 * Fetch wrapper for PUT requests
 *
 * @param path - endpoint
 * @param body - PUT request body
 * @return     - promise
 */
export const put = (path, body, opts) => (apiFetch(path, {
  ...opts,
  method: 'PUT',
  body: JSON.stringify(body),
}))

/**
 * Fetch wrapper for DELETE requests
 *
 * @param path - endpoint
 * @return     - promise
 */
export const del = (path, opts) => (apiFetch(path, {
  ...opts,
  method: 'DELETE',
}))

/**
 * Fetch wrapper for POST requests
 *
 * @param {string} path - endpoint
 * @param {*} body - POST request body
 * @return {*}     - promise
 */
export const blob = (path, body, opts) => fetch(path, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Accept': 'application/json', // eslint-disable-line
    'Content-Type': 'application/json',
    ...authHeader(),
  },
  ...opts,
})
  .then(checkHttpStatus)
  .then((res) => {
    if (res instanceof Response) {
      return res.blob()
    }

    throw new RequestError(res)
  })

/**
 * Fetch wrapper for POST requests
 *
 * @param {string} path - endpoint
 * @param {*} body - FormData object
 * @return {*}     - promise
 */
export const blobMultipart = (path, body, method = 'POST', opts) => fetch(path, {
  method,
  body,
  headers: {
    'Accept': 'application/json', // eslint-disable-line
    ...authHeader(),
  },
  ...opts,
})
  .then(checkHttpStatus)
  .then((res) => {
    if (res instanceof Response) {
      return res.json()
    }

    throw new RequestError(res)
  })

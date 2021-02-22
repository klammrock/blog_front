import jwtDecode from 'jwt-decode'
//import _ from 'lodash'

/**
 * Store raw token
 * @param {*} token
 */
export const setToken = (token) => {
  localStorage.setItem('token', token)
}

/**
 * Get raw token value
 */
export const getToken = () => localStorage.getItem('token') || ''

/**
 * Get info from token
 */
export const getInfo = (jwt) => {
  try {
    const token = jwt || getToken()
    const {
      exp, sub, role,
    } = jwtDecode(token)

    const expireDate = parseInt(exp, 10) * 1000
    return Date.now() < expireDate ? {
      sub, role,
    } : null
  } catch (error) {
    return null
  }
}

export const getAuths = (user) => {
  return {
    isAuth: user != null,
  };
};

/**
 * Validate stored token
 */
export const isStoredTokenValid = () => {
  try {
    const token = getToken()
    const decoded = jwtDecode(token)
    const expireDate = parseInt(decoded.exp, 10) * 1000
    return Date.now() < expireDate
  } catch (error) {
    return false
  }
}

/**
 * Remove token from storage
 */
export const removeToken = () => {
  localStorage.removeItem('token')
}

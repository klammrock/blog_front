const versionPath = process.env.REACT_APP_API_BASE_PATH
const baseUrl = process.env.REACT_APP_API_BASE_URL || `http://${window.location.hostname}:3000`
const wsBaseUrl = process.env.REACT_APP_WS_BASE_URL || `http://${window.location.hostname}:3001`

export default {
  app: {
    title: process.env.REACT_APP_APP_TITLE,
    favicon: process.env.REACT_APP_APP_FAVICON,
    loginLogo: process.env.REACT_APP_APP_LOGIN_LOGO,
  },
  api: {
    versionPath,
    baseUrl,
    url: `${baseUrl}${versionPath}`,
    wsBaseUrl,
  }
};

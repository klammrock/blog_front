import config from 'config'

import { get } from './helpers';

const apiUrl = `${config.api.url}/posts`

const indexAction = (query) => get(`${apiUrl}?${query}`)

export default {
  index: indexAction,
}

import { combineReducers } from 'redux-seamless-immutable';

import auth from './modules/auth'
//import home from './modules/home/base'

export default combineReducers({
  auth,
  //home,
});

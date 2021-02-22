import { combineReducers } from 'redux-seamless-immutable';

import app from './modules/app'
import auth from './modules/auth'
//import home from './modules/home/base'

export default combineReducers({
  app,
  auth,
  //home,
});

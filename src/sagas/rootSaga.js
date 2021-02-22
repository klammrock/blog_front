import { all, fork } from 'redux-saga/effects';

import appSaga from './app'
// import authSaga from './auth'
// import home from './home'

export default function* () {
  yield all([
    fork(appSaga),
    // fork(authSaga),
    // fork(home),
  ]);
}

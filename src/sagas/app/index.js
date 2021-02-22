import {
  all, takeLatest, call, fork, put,
} from 'redux-saga/effects'

import apiPosts from 'services/api/posts'

import { fetchPosts } from 'redux/modules/app'

function* fetchPostsIterator({ payload: { cb } }) {
  try {
    const { success, data, error } = yield call(apiPosts.index, '')
    if (success) {
      yield call(cb, { isSuccess: true, data })
      // yield put(fetchErrors.success(data))
    } else {
      yield call(cb, { isSuccess: false, error })
      yield call(console.error, error)
      yield put(fetchPosts.failure())
    }
  } catch (e) {
    // TODO: error
    yield call(cb, { isSuccess: false })
    yield call(console.error, e)
    yield put(fetchPosts.failure())
  }
}

function* fetchPostsSaga() {
  yield takeLatest(
    fetchPosts.REQUEST,
    fetchPostsIterator,
  )
}

export default function* () {
  yield all([
    fork(fetchPostsSaga),
  ])
}

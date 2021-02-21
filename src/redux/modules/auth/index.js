import { from } from 'seamless-immutable'

import { createReducer, createAsyncAction } from '../../../utils/actions'
// import {
//   getInfo, setToken, removeToken, getAuths,
// } from '../../../services/jwt'

// export const LOGIN = 'auth/LOGIN'
// export const LOGOUT = 'auth/LOGOUT'

// export const login = createAsyncAction(LOGIN)
// export const logout = createAsyncAction(LOGOUT)

// const userGlobal = getInfo()

const initialState = from({
  // ...getAuths(userGlobal),
  // user: userGlobal,
})

export default createReducer({
  // [login.SUCCESS]: (state, { payload: { jwt } }) => {
  //   setToken(jwt)
  //   const user = getInfo()
  //   const auths = getAuths(user)

  //   return state.merge({
  //     ...auths,
  //     user,
  //   })
  // },

  // [logout.SUCCESS]: (state) => {
  //   removeToken()
  //   const user = null
  //   return state.merge({
  //     ...getAuths(user),
  //     user,
  //   })
  // },
}, initialState)

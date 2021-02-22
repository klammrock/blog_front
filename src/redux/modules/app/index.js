import { from } from 'seamless-immutable'
import { createReducer, createAsyncAction } from 'utils/actions'

export const FETCH_POSTS = 'app/FETCH_POSTS'

export const fetchPosts = createAsyncAction(FETCH_POSTS)

const initialState = from({
  posts: [],
})

export default createReducer({
  [fetchPosts.SUCCESS]: (state, { payload: data }) => {
    return state.merge({
      posts: data,
    })
  },

  // [logout.SUCCESS]: (state) => {
  //   removeToken()
  //   const user = null
  //   return state.merge({
  //     ...getAuths(user),
  //     user,
  //   })
  // },
}, initialState)
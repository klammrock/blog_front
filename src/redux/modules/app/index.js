import { createAsyncAction } from '../../../utils/actions'

export const FETCH_POSTS = 'app/FETCH_POSTS'

export const fetchPosts = createAsyncAction(FETCH_POSTS)

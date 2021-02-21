/**
 * Create default action for redux
 * @param {string} type
 */
export const createAction = (type) => (payload) => ({ type, payload });


/**
 * Create default async action (with using of saga)
 * @param {string} type
 */
export const createAsyncAction = (type) => {
  const REQUEST = `${type}_REQUEST`;
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return Object.assign(createAction(REQUEST), {
    type,
    success: createAction(SUCCESS),
    failure: createAction(FAILURE),
    REQUEST,
    SUCCESS,
    FAILURE
  });
};

/* eslint-disable */
export const createReducer = (handlers, initialState) =>
  (state = initialState, action = null) =>
    (handlers[action.type]
      ? handlers[action.type](state, action)
      : state);
/* eslint-enable */

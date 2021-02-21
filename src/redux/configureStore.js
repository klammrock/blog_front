import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { from } from 'seamless-immutable';
import { stateTransformer } from 'redux-seamless-immutable';

import rootReducer from './rootReducer';
import rootSaga from 'sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
  stateTransformer,
  collapsed: true
});

const configureStoreProduction = (initialState) => {
  const middlewares = [
    sagaMiddleware,
  ];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

const configureStoreDev = (initialState) => {
  const middlewares = [
    loggerMiddleware,
    sagaMiddleware,
  ];

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

const initialState = from({});

const store = process.env.NODE_ENV === 'development'
  ? configureStoreDev(initialState)
  : configureStoreProduction(initialState);

export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

import { createReducer } from 'store/reducer';

const sagaMiddleware = createSagaMiddleware()

export function injectAsyncReducer(name, asyncReducer) {
  if (name in store.asyncReducers) {
    console.warn(`trying to inject a reducer twice: ${name}`);
    return;
  }
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

export function injectSaga(name, saga) {
  if (name in store.sagas) {
    console.warn(`trying to inject a saga twice: ${name}`);
    return;
  }
  store.sagas[name] = saga;
  sagaMiddleware.run(saga);
}

const initialState = {};

export const store = createStore(
  createReducer(),
  initialState,
  compose(
    applyMiddleware(sagaMiddleware),
    devToolsEnhancer(),
  ),
)
store.asyncReducers = {};
store.sagas = {};

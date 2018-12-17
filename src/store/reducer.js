import { combineReducers } from 'redux'

export function createReducer(asyncReducers = { dummy: () => true }) {
  return combineReducers({
    ...asyncReducers,
  });
}

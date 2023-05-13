import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import bills from './bills';
import users from './users';
import splits from './splits';

const reducer = combineReducers({
  auth,
  bills,
  users,
  splits
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './bills';
export * from './users';
export * from './splits';

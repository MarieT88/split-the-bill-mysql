import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import bills from './bills';
import events from './events';
import users from './users';

const reducer = combineReducers({
  auth,
  bills,
  events,
  users
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './bills';
export * from './events';
export * from './users';

import { applyMiddleware, legacy_createStore  } from 'redux';
import {  reducerFn } from './reducers';
import logger from 'redux-logger';
const middleware = applyMiddleware(logger);

export const myStore = legacy_createStore(reducerFn, middleware);

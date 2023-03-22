import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

const middlewares = [logger];
const composedEnhancer = compose(applyMiddleware(...middlewares));
export const store = createStore(rootReducer, composedEnhancer);

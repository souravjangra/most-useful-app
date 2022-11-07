import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './slices/app';
import loadingReducer from './slices/loading';

const rootReducer = combineReducers({
  app: appReducer,
  loading: loadingReducer,
});

export default rootReducer;

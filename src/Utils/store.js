import {configureStore} from '@reduxjs/toolkit';
import audioReducer from './AudioRecsSlice';
import authReducer from './AuthSlice';

import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
const store = configureStore({
  reducer: {
    auth: authReducer,
    audioRecs: audioReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;

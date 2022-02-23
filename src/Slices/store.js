import {configureStore} from '@reduxjs/toolkit';
import audioReducer from './AudioRecsSlice';
import authReducer from './AuthSlice';
import audioPlayerReducer from './AudioPlayerSlice';
import userReducer from './UserSlice';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    auth: authReducer,
    audioRecs: audioReducer,
    audioPlayer: audioPlayerReducer,
    user: userReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;

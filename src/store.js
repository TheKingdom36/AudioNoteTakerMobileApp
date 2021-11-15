import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './CounterSlice'
import audioReducer from './AudioRecsSlice'


export default store = configureStore({
    reducer: {
        counter: counterReducer,
        audioRecs: audioReducer,
    },
})


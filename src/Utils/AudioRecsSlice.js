import {createSlice} from '@reduxjs/toolkit';
import {fetchRecordings} from './scripts/AudioRequests';

export const audioRecsSlice = createSlice({
  name: 'audioRecs',
  initialState: {
    values: [],
  },
  reducers: {
    addRec: (state, action) => {
      state.values.push(action.payload);
    },
    removeRec: (state, action) => {
      const index = state.values.findIndex(
        element => (element.id = action.payload),
      );

      if (index > -1) {
        state.values.splice(index, 1);
      }
    },
    updateRecList: (state, action) => {
      let newValues = [];

      action.payload.forEach(element => {
        newValues.push(element);
      });

      state.values = newValues;
    },
    clearAudioRecs: state => {
      state.values = [];
    },
    findIds: state => {
      const ids = [];

      state.values.forEach(element => ids.push(element.id));

      return ids;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addRec, removeRec, updateRecList, clearAudioRecs, findIds} =
  audioRecsSlice.actions;

export default audioRecsSlice.reducer;

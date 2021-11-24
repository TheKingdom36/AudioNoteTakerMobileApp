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
      state.values = [];
      if (action.payload !== undefined && action.payload.length !== 0) {
        state.values = state.values.concat(action.payload);
      }
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

export async function fetchAudioRecs(
  tags = [],
  title = '',
  startDate = '',
  endDate = '',
) {
  //TODO implement real fetch

  let data = [
    {
      id: '1',
      title: 'FirstItem.m4a',
      length: 60,
      createdAt: 3000,
      describtion: 'This is describe',
      tags: ['work', 'personal'],
    },
    {
      id: '2',
      title: 'FirstItem.m4a',
      length: 60,
      createdAt: 3000,
      describtion: 'This is describe',
      tags: ['work', 'personal'],
    },
    {
      id: '3',
      title: 'FirstItem.m4a',
      length: 60,
      createdAt: 3000,
      describtion: 'This is describe',
      tags: ['work', 'personal'],
    },
    {
      id: '4',
      title: 'FirstItem.m4a',
      length: 60,
      createdAt: 3000,
      describtion: 'This is describe',
      tags: ['work', 'personal'],
    },
    {
      id: '5',
      title: 'FirstItem.m4a',
      length: 60,
      createdAt: 3000,
      describtion: 'This is describe',
      tags: ['work', 'personal'],
    },
  ];

  fetchRecordings();

  return data;
}

// Action creators are generated for each case reducer function
export const {addRec, removeRec, updateRecList, clearAudioRecs, findIds} =
  audioRecsSlice.actions;

export default audioRecsSlice.reducer;

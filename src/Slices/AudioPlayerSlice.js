import {createSlice} from '@reduxjs/toolkit';

export const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState: {
    values: [],
  },
  reducers: {
    addAudioPlayer: (state, action) => {
      state.values.push(action.payload);
    },
    removeAudioPlayer: (state, action) => {
      const index = state.values.findIndex(
        element => (element.id = action.payload),
      );

      if (index > -1) {
        state.values.splice(index, 1);
      }
    },
    updateAudioPlayerList: (state, action) => {
      let newValues = [];

      action.payload.forEach(element => {
        newValues.push(element);
      });

      state.values = newValues;
    },
    updateAudioPlayer: (state, action) => {
      let value = state.values.find(element => element.id == action.payload.id);

      value.paused = action.payload.paused;
      value.playing = action.payload.playing;
    },
    setAudioPlayerToPlaying: (state, action) => {
      console.log('audio State', state);
      state.values.forEach(element => {
        if (element.id === action.payload.id) {
          console.log('audio Playing function', action);
          element.paused = false;
        } else {
          element.paused = true;
        }
      });
    },
    setAudioPlayerToPaused: (state, action) => {
      let value = state.values.find(element => {
        return element.id === action.payload.id;
      });

      console.log('value', value);

      value.paused = true;

      console.log('Updated Value', value);
    },
    clear: state => {
      state.values = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addAudioPlayer,
  removeAudioPlayer,
  setAudioPlayerToPlaying,
  updateAudioPlayerList,
  setAudioPlayerToPaused,
  updateAudioPlayer,
  clear,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;

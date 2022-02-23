import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import TokenApi from '../Utils/ClientApis/TokenApi';

export const fetchToken = createAsyncThunk(
  'fetchToken',
  async (details, thunkAPI) => {
    const response = await TokenApi.instance.fetchToken(
      details.username,
      details.password,
    );
    return response;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    isSignedIn: 'false',
  },
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      // Add user to the state array
      state.accessToken = action.payload.value.split(' ').pop();
    });
  },
});

// Action creators are generated for each case reducer function
export const {setToken} = authSlice.actions;

export default authSlice.reducer;

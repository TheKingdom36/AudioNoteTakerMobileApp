import {createSlice} from '@reduxjs/toolkit';
import UserApi from '../Utils/ClientApis/UserApi';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'fetchUser',
  async (details, thunkAPI) => {
    console.log('preresponse');
    const response = await UserApi.instance.getUser();
    console.log('response', response);
    return response;
  },
);

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    User: undefined,
  },
  reducers: {
    setUser: (state, action) => {
      state.User = action.payload.User;
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.User = action.payload.value.split(' ').pop();
    });
  },
});

// Action creators are generated for each case reducer function
export const {setUser} = UserSlice.actions;

export default UserSlice.reducer;

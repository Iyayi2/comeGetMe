import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './types';
import User from '@/models/User';

const initialState: RootState['user'] = { loggedIn: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.loggedIn = action.payload;
    },
    logout: (state) => {
      state.loggedIn = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

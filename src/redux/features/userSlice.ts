import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  email: string;
  password?: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [] as User[],
    currentUser: null as User | null,
  },
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      if (!state.users) {
        state.users = [];
      }
      const { email, password } = action.payload;
      const existingUser = state.users.find(u => u.email === email);
      if (!existingUser) {
        state.users.push({ email, password });
      }
    },
    loginSession: (state, action: PayloadAction<string>) => {
      state.currentUser = { email: action.payload };
    },
    logoutUser: (state) => {
      state.currentUser = null;
    }
  }
});

export const { registerUser, loginSession, logoutUser } = userSlice.actions;

export default userSlice.reducer;

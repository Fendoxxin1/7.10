import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../api/usersApi";

type UserState = {
  selectedUser: User | null;
};

const initialState: UserState = {
  selectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;

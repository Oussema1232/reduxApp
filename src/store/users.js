import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addMember: (members, action) => {
      members.push({
        id: Date.now(),
        name: action.payload.name,
      });
    },
  },
});

export default slice.reducer;
export const { addMember } = slice.actions;

export const memberSelect = (userId) =>
  createSelector(
    (state) => state.entities.users,
    (users) => users.find((user) => user.id === userId)
  );

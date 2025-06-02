import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        addUser(state, action) {
            return action.payload;
            // state.isAuthenticated = true;
        },
        removeUser(state) {
            return null;
            // state.isAuthenticated = false;
        },
    },
})

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
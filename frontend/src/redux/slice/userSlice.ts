import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userType } from '@/types/type';

// Define the state interface
interface userState {
    loggedInUser: userType | null;
}

// Define initial state
const initialState: userState = {
    loggedInUser: null, // Default value is null, meaning no user is logged in
};

// Create the userSlice with reducers
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Set logged-in user
        setLoggedInUser: (state, action: PayloadAction<userType | null>) => {
            state.loggedInUser = action.payload;
        },

        // Clear the logged-in user
        clearLoggedInUser: (state) => {
            state.loggedInUser = null;
        },
    },
});


export const { setLoggedInUser, clearLoggedInUser } = userSlice.actions;

export const userReducer = userSlice.reducer;

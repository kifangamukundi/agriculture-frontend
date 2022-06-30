import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../requestMethods";

// Initial state comprising of { "idle", "loading", "succeeded", "failed" }
const initialState = {
    currentUser: [],
    users: [],
    status: 'idle',
    error: null
}

// Register a new user
export const addNewUser = createAsyncThunk('users/addNewUser', async (initialUser, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await publicRequest.post("/auth/signup", initialUser)
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})
// Login a user
export const loginUser = createAsyncThunk('users/loginUser', async (initialUser, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await publicRequest.post("/auth/signin", initialUser)
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})
// Logout a user
export const logOutUser = createAsyncThunk('users/logOutUser', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await localStorage.clear('persist:root');
    } catch (error) {
        console.log(error);
        return rejectWithValue(error)
    }
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { productId, reaction } = action.payload
            const existingProduct = state.entities[productId]
            if (existingProduct) {
                existingProduct.reactions[reaction]++
            }
        },
        increaseCount(state, action) {
            state.count = state.count + 1
        }
    },
    extraReducers(builder) {
        builder

            // Register a new user actions
            .addCase(addNewUser.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Login a user actions
            .addCase(loginUser.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currentUser = action.payload
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Logout a user actions
            .addCase(logOutUser.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(logOutUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currentUser = []
                state.error = null
            })
            .addCase(logOutUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export const selectUserById = (state, userId) =>
    state?.users?.users?.find(user => user._id === userId);

// We could destructure the actions here, but we don't have them yet
export const { productAdded } = userSlice.actions

export default userSlice.reducer
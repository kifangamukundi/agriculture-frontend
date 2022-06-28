import {createSlice, createAsyncThunk, createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../requestMethods";

const userAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = userAdapter.getInitialState({
    currentUser: null,
    status: 'idle',
    error: null,
})

export const registerUser = createAsyncThunk('user/registerUser', async () => {
    const response = await publicRequest.post("/auth/signup")
    return response.data
})

export const loginUser = createAsyncThunk('user/loginUser', async (initialProduct) => {
    const response = await publicRequest.post("/auth/signin", initialProduct)
    return response.data
})

export const loginOutUser = createAsyncThunk('user/loginOutUser', async (initialProduct) => {
    const response = await publicRequest.post("/auth/signup", initialProduct)
    return response.data
})

const userSlice = createSlice({
    name: 'user',
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
            .addCase(registerUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(loginUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds
    // Pass in a selector that returns the products slice of state
} = userAdapter.getSelectors(state => state.user)


export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;

export const selectproductsByUser = createSelector(
    [selectAllProducts, (state, userId) => userId],
    (products, userId) => products.filter(product => product.userId === userId)
)

export const { increaseCount, reactionAdded } = userSlice.actions

export const userSelector = (state) => state.user;

export default userSlice.reducer
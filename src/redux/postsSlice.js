import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../requestMethods";

const POSTS_URL = 'http://localhost:8080/api/product';

// Initial state comprising of { "idle", "loading", "succeeded", "failed" }
const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

// Fetch posts from the API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await publicRequest.get(`${POSTS_URL}/all`)
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

// Add a new post to the API
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await userRequest.post(POSTS_URL, initialPost)
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

// Update a post in the API
export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost, thunkAPI) => {
    const { id } = initialPost;
    const { rejectWithValue } = thunkAPI
    try {
        const response = await userRequest.patch(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
        
    }
})

// Delete a post from the API
export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { id } = initialPost;
    try {
        const response = await userRequest.delete(`${POSTS_URL}/${id}`)
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
        },
    },
    extraReducers(builder) {
        builder

            // Fetch posts actions
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Add new post actions
            .addCase(addNewPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.status = 'succeeded'
                action.payload._id = state?.posts?.posts?.products[state?.posts?.posts?.products?.length - 1]._id + 1;
                console.log(action?.payload?.createdProduct?._id)
                console.log(action.payload.createdProduct)
                state?.posts?.posts?.products?.push(action?.payload?.createdProduct)
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Update post actions
            .addCase(updatePost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                console.log(action.payload)
                const posts = state.posts.posts.products.filter(post => post.id !== id);
                state.posts = [...posts, action.payload];
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Delete post actions
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const posts = state?.posts?.posts?.products?.filter(post => post.id !== id);
                state.posts = posts;
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, productId) =>
    state?.posts?.posts?.products?.find(product => product._id === productId);

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
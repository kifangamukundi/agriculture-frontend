import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../requestMethods";

// Initial state comprising of { "idle", "loading", "succeeded", "failed" }
const initialState = {
    categories: [],
    status: 'idle',
    error: null
}

// Fetch categories from the API
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await publicRequest.get("/categories")
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

// Add a new category to the API
export const addNewCategory = createAsyncThunk('categories/addNewCategory', async (initialCategory, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await userRequest.post("/categories", initialCategory)
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

// Update a category in the API
export const updateCategory = createAsyncThunk('categories/updateCategory', async (initialCategory, thunkAPI) => {
    const { id } = initialCategory;
    const { rejectWithValue } = thunkAPI
    try {
        const response = await userRequest.patch(`/categories/${id}`, initialCategory)
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
        
    }
})

// Delete a category from the API
export const deleteCategory = createAsyncThunk('categories/deletePost', async (initialCategory, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { id } = initialCategory;
    try {
        const response = await userRequest.delete(`/categories/${id}`)
        if (response?.status === 200) return initialCategory;
        return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoryAdded: {
            reducer(state, action) {
                state.categories.push(action.payload)
            },
        },
    },
    extraReducers(builder) {
        builder

            // Fetch categories actions
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Add new category actions
            .addCase(addNewCategory.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(addNewCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                console.log(action?.payload?.createdCategory?._id)
                console.log(action.payload.createdCategory)
                state?.categories?.categories?.categories?.push(action?.payload?.createdCategory)
            })
            .addCase(addNewCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Update category actions
            .addCase(updateCategory.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                console.log(action.payload)
                const categories = state.categories.categories.categories.filter(category => category.id !== id);
                state.categories = [...categories, action.payload];
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Delete category actions
            .addCase(deleteCategory.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const categories = state?.categories?.categories?.categories?.filter(category => category.id !== id);
                state.categories = categories;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllCategories = (state) => state.categories.categories;
export const getCategoriesStatus = (state) => state.categories.status;
export const getCategoriesError = (state) => state.categories.error;

export const selectCategoryById = (state, categoryId) =>
    state?.categories?.categories?.categories?.find(category => category._id === categoryId);

// We could destructure the actions here, but we don't have them yet
export const { categoryAdded } = categoriesSlice.actions

export default categoriesSlice.reducer
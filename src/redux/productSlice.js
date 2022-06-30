import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../requestMethods";

// Initial state comprising of { "idle", "loading", "succeeded", "failed" }
const initialState = {
    products: [],
    status: 'idle',
    error: null
}

// Fetch products from the API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await publicRequest.get("/product/all")
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

// Add a new product to the API
export const addNewProduct = createAsyncThunk('products/addNewProduct', async (initialProduct, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await userRequest.post("/product", initialProduct)
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

// Update a product in the API
export const updateProduct = createAsyncThunk('products/updateProduct', async (initialProduct, thunkAPI) => {
    const { id } = initialProduct;
    const { rejectWithValue } = thunkAPI
    try {
        const response = await userRequest.patch(`/product/${id}`, initialProduct)
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
        
    }
})

// Delete a product from the API
export const deleteProduct = createAsyncThunk('products/deletePost', async (initialProduct, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { id } = initialProduct;
    try {
        const response = await userRequest.delete(`/product/${id}`)
        if (response?.status === 200) return initialProduct;
        return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productAdded: {
            reducer(state, action) {
                state.products.push(action.payload)
            },
        },
    },
    extraReducers(builder) {
        builder

            // Fetch products actions
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Add new product actions
            .addCase(addNewProduct.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                console.log(action?.payload?.createdProduct?._id)
                console.log(action.payload.createdProduct)
                state?.products?.products?.products?.push(action?.payload?.createdProduct)
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Update product actions
            .addCase(updateProduct.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                console.log(action.payload)
                const products = state.products.products.products.filter(product => product.id !== id);
                state.products = [...products, action.payload];
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Delete product actions
            .addCase(deleteProduct.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const products = state?.products?.products?.products?.filter(product => product.id !== id);
                state.products = products;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export const selectProductById = (state, productId) =>
    state?.products?.products?.products?.find(product => product._id === productId);

// We could destructure the actions here, but we don't have them yet
export const { productAdded } = productsSlice.actions

export default productsSlice.reducer
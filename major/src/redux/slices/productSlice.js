import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../services/api';

export const fetchProduct = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetchProducts();
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [], // Ensure it's an array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || []; // Ensure action.payload is an array
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

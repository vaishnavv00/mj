import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToWishlist, removeFromWishlist, getWishlist } from "../../services/api";

const initialState = {
  wishlist: [],
  loading: false,
  error: null
};

// Create async thunks for API calls
export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
  try {
      const response = await getWishlist();
      return response.data;  // Ensure response structure is correct
  } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching wishlist");
  }
});

export const addItemToWishlist = createAsyncThunk("wishlist/addItem", async (productId, { rejectWithValue }) => {
  try {
      const response = await addToWishlist(productId);
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding to wishlist");
  }
});

export const removeItemFromWishlist = createAsyncThunk("wishlist/removeItem", async (productId, { rejectWithValue }) => {
  try {
      await removeFromWishlist(productId);
      return productId;  // Return only productId for filtering
  } catch (error) {
      return rejectWithValue(error.response?.data || "Error removing from wishlist");
  }
});

// Create Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(fetchWishlist.pending, (state) => {
              state.loading = true;
          })
          .addCase(fetchWishlist.fulfilled, (state, action) => {
            console.log("Wishlist API Response:", action.payload); // ✅ Debug API response
            state.loading = false;
            state.wishlist = action.payload?.products || []; // ✅ Extract `products` correctly
        })
        
          .addCase(fetchWishlist.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
          })
          .addCase(addItemToWishlist.fulfilled, (state, action) => {
              state.wishlist.push(action.payload);
          })
          .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
              state.wishlist = state.wishlist.filter(item => item._id !== action.payload);
          });
  }
});

export default wishlistSlice.reducer;

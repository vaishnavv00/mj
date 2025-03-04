import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../../services/api";

// Get user info from local storage
const userInfo = localStorage.getItem("userInfo") 
  ? JSON.parse(localStorage.getItem("userInfo")).data 
  : null;

export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await loginUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(response));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await registerUser(userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchUserProfile = createAsyncThunk("auth/getProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await getUserProfile();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateUser = createAsyncThunk("auth/updateProfile", async (userData, { rejectWithValue }) => {
  try {
    const response = await updateUserProfile(userData);
    localStorage.setItem("userInfo", JSON.stringify({ data: response.data }));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userInfo,
    loading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify({ data: action.payload }));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

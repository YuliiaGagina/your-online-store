import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const initialState = {
  currentUser: null,
  cart: [],
  isLoading: false,
  formType: "signup",
  showform: false,
  like: [],
};

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload);
      const login = await axios(`${BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${res.data.access_token}` },
      });
      return login.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const addCurrentUser = (state, { payload }) => {
  state.currentUser = payload;
};
export const updateteUser = createAsyncThunk(
  "users/updateUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);
      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else {
        newCart.push({ ...payload, quantity: 1 });
      }
      state.cart = newCart;
    },
    toogleform: (state, { payload }) => {
      state.showform = payload;
    },
    toogleFormType: (state, { payload }) => {
      state.formType = payload;
    },
    removeItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(({ id }) => id !== payload);
    },
    addItemToLike: (state, { payload }) => {
      let newLike = [...state.like];
      const found = state.like.find(({ id }) => id === payload.id);
      if (found) {
        newLike = newLike.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else {
        newLike.push({ ...payload, quantity: 1 });
      }
      state.like = newLike;
    },
    removeItemFromLike: (state, { payload }) => {
      state.like = state.like.filter(({ id }) => id !== payload);
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getCategories.pending, (state, { payload }) => {
    //   state.isLoading = true;
    // });
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    builder.addCase(updateteUser.fulfilled, addCurrentUser);
    // builder.addCase(getCategories.rejected, (state) => {
    //   state.isLoading = false;
    // });
  },
});
export const {
  addItemToCart,
  toogleform,
  toogleFormType,
  removeItemFromCart,
  addItemToLike,
  removeItemFromLike,
} = userSlice.actions;
export default userSlice.reducer;

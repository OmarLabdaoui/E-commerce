import React from 'react'
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { url, setHeaders } from "./api";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  editStatus: null,
  deleteStatus: null,
  addCommentStatus: null,
}
export const productsEdit = createAsyncThunk(
  "products/productsEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values.product._id}`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);

    }
  }
);
export const productsCommentCreate = createAsyncThunk(
  "products/productsCommentCreate",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/comments/${values.product._id}`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);

    }
  }
);
export const productDelete = createAsyncThunk(
  "products/productDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data);

    }
  }
);
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get(`${url}/products`)
    return response?.data;
  }
)
export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);

    }
  }
);


const productslice = createSlice({
  name: "products",
  initialState,
  reducers: {
    displaycat: (state, action) => {
      const filteritem = state.items.filter((item) => item.cat === action.payload.cat)
      state.items = filteritem

    },

  },
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending"
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "Erorr"
    },
    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";

    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [productDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items = newList;
      state.deleteStatus = "success";

    },
    [productDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [productsEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [productsEdit.fulfilled]: (state, action) => {
      const updatedProducts = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      state.items = updatedProducts;
      state.editStatus = "success";

    },
    [productsEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },



    [productsCommentCreate.pending]: (state, action) => {
      state.addCommentStatus = "pending";
    },
    [productsCommentCreate.fulfilled]: (state, action) => {
      state.items.map((item) => {
        if (item._id === action.payload._id) {
          item.comments.push(action.payload)
        }
      })

      state.addCommentStatus = "success";

    },
    [productsCommentCreate.rejected]: (state, action) => {
      state.addCommentStatus = "rejected";
    },






  }
})
export const { displaycat } = productslice.actions
export default productslice.reducer

export const selectProduct = (state) => state.products.items

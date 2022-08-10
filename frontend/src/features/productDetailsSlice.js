import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";

const initialState = {
  productsFetchdetail: localStorage.getItem('comment') ? JSON.parse(localStorage.getItem('comment')) : [],
  cartProductQuantity: 0,
  addCommentStatus: null
};
export const productsCreateComment = createAsyncThunk(
  "products/productsCreateComment",
  async (id, values) => {
    try {
      const response = await axios.post(
        `${url}/products/find/${id}`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);

    }
  }
)

const detailSlice = createSlice({
  name: "producrdetails",
  initialState,
  reducers: {
    detailp: (state, action) => {
      state.productsFetchdetail = action.payload
      localStorage.setItem('comment', JSON.stringify(state.productsFetchdetail))
    },
    addcomment: (state, action) => {
      state.productsFetchdetail.comment.push(action.payload)
      localStorage.setItem('comment', JSON.stringify(state.productsFetchdetail))
    },
    test: (state, action) => {
      const gg = state.productsFetchdetail.cartQuantity + action.payload
      state.productsFetchdetail(gg)
    },
    deceaseQuantity(state, action) {

      state.productsFetchdetail.cartQuantity -= 1



    },


  },
  extraReducers: {
    [productsCreateComment.pending]: (state, action) => {
      state.addCommentStatus = "pending";
    },
    [productsCreateComment.fulfilled]: (state, action) => {

      state.productsFetchdetail.comment.push(action.payload)


      state.addCommentStatus = "success";

    },
    [productsCreateComment.rejected]: (state, action) => {
      state.addCommentStatus = "rejected";
    },
  }
},
);

export default detailSlice.reducer;
export const { detailp, addCartt, deceaseQuantity, test, addcomment } = detailSlice.actions
export const { selectDetail } = (state) => state.producrdetails.productsFetchdetail

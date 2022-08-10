import { createSlice } from "@reduxjs/toolkit";

const initialState={
   cartItems:localStorage.getItem('CartItems')?JSON.parse(localStorage.getItem('CartItems')):[],
   cartProductQuantity:0,
   cartAmoutTotal:0,
}
const cartSlice=createSlice({
    name:"cart",
   initialState,
   reducers:{
       addCart:(state,action) => {
    const findcartindex=state.cartItems.findIndex((item) => item._id===action.payload._id)
    if(findcartindex>=0){
       state.cartItems[findcartindex].cartQuantity+=1
    }else{
        const tempproduct={...action.payload,cartQuantity:1}
        state.cartItems.push(tempproduct)
    }
          localStorage.setItem('CartItems', JSON.stringify(state.cartItems))
       },
       ajouter:(state,action)=> {
            state.cartItems.cartProductQuantity+=action.payload
       },
       removefromcart(state,action){
       const remove= state.cartItems.filter(item=>item._id!==action.payload._id)
    state.cartItems=remove
    localStorage.setItem('CartItems', JSON.stringify(state.cartItems))
       },
       clearCart(state,action){
        state.cartItems=[]
        localStorage.setItem('CartItems', JSON.stringify(state.cartItems))
       },
       deceaseQuantity(state,action){
         const decindex=state.cartItems.findIndex((item) => item._id===action.payload._id)
         if(state.cartItems[decindex].cartQuantity>1){
            state.cartItems[decindex].cartQuantity-=1
         }else if(state.cartItems[decindex].cartQuantity===1){
            const remove= state.cartItems.filter((item)=>item._id!==action.payload._id)
    state.cartItems=remove
         }
         localStorage.setItem('CartItems', JSON.stringify(state.cartItems))
       },
       getTotal(state, action){
          let {total,quatity}=state.cartItems.reduce((carttotal,cartItems)=>{
           const {price,cartQuantity}=cartItems
            carttotal.total+=price*cartQuantity
            carttotal.quatity+=cartQuantity
            return carttotal;
          },{
            total:0,
            quatity:0, 
          })
          state.cartProductQuantity=quatity
          state.cartAmoutTotal=total
       },
       adddetailcart:(state,action) => {
        
             const tempproduct={...action.payload}
             state.cartItems.push(tempproduct)
        
            },
   }

})
export const {addCart,removefromcart,ajouter,clearCart,deceaseQuantity,getTotal,adddetailcart} =cartSlice.actions
export default cartSlice.reducer
export const selectCartItem=(state)=>state.cart.cartItems

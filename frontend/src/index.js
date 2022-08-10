import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'
import { Provider, useDispatch } from 'react-redux'
import productsreducer, { productsFetch } from "./features/productsSlice"
import { productsApi } from './features/productsApi';
import cartReducer, { getTotal } from './features/CartSlice';
import producrdetailsreducer, { productsFetchdetails } from './features/productDetailsSlice'
import userReducer from './features/userSlice'
import ordersSlice from './features/oderSlice'
import authReducer from './features/authSlice'
import { catApi } from './features/catApi';
import UsersSlice from './features/UsersSlice';
const store = configureStore({
  reducer: {
    products: productsreducer,
    cart: cartReducer,
    orders: ordersSlice,
    users: UsersSlice,
    producrdetails: producrdetailsreducer,
    user: userReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [catApi.reducerPath]: catApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catApi.middleware),
})

store.dispatch(productsFetch())
store.dispatch(getTotal())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

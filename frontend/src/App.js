import React, { useEffect } from 'react'
import "./App.css"
import IconButton from '@mui/material/IconButton';
import { FaShoppingBag } from "react-icons/fa";
import Navbar from './component/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Homme from './component/Homme';
import Cart from './component/Cart';
import Notfound from './component/Notfound';
import Chekout from './component/Chekout';
import ProductDetail from './component/ProductDetail';

import Register from './component/Register';
import { login, logout, selectUser, setusername } from './features/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './component/firebase';
import Chekout_success from './component/Chekout_success';
import Login from './component/Login';
import { loadUser } from './features/authSlice';
import Admin from './component/Admin';
import Products from './component/Products';
import Summary from './component/Summary';
import CreateProduct from './component/CreateProduct';
import Test from './component/Test';
import Filterproducts from './component/Filterproducts';
import Orders from './component/Orders';
import User from './component/User';
import ProductList from './component/ProductList';

import ViewProduct from './component/ProductButton/ViewProduct';
import { Toaster } from 'react-hot-toast';

import NotFoundImage from './component/NotFoundImage';
import Order from './component/Order';
import UsersList from './component/Users';
import Profile from './component/Profile';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

  return (
    <>


      <BrowserRouter>

        <>

          <Navbar />
          <Toaster />
          <Routes>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/testts" element={<NotFoundImage />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
            <Route path="/order/:id" element={<Order />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/Chekout" element={<Chekout />}></Route>
            <Route path="/filter" element={<Filterproducts />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/chekout_success" exact element={<Chekout_success />} />
            <Route path="/Notfound" element={<Notfound />}></Route>
            <Route path="/" exact element={<Homme />}></Route>
            <Route path="/productView/:id" element={<ViewProduct />}></Route>
            <Route path="/admin" exact element={<Admin />}>
              <Route path="products" exact element={<Products />}>
                <Route index element={<ProductList />} />
                <Route path="createproduct" exact element={<CreateProduct />} />

              </Route>
              <Route path="summary" exact element={<Summary />} />
              <Route path="orders" exact element={<Orders />} />
              <Route path="users" exact element={<UsersList />} />

            </Route>

            <Route path="/ProductDetail/:id" exact element={<ProductDetail />}></Route>

            <Route path="/register" exact element={<Register />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="*" exact element={<Notfound />} />
          </Routes>


        </>
      </BrowserRouter>

    </>
  )
}

export default App
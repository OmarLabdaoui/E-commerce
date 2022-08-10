import React from 'react'
import IconButton from '@mui/material/IconButton';
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useNavigate
} from "react-router-dom";

import "./Navbar.css"
import styled from "styled-components";
import { logoutUser } from "../features/authSlice";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../features/userSlice'

import { clearCart } from "../features/CartSlice"
import { selectProduct } from '../features/productsSlice';
import { useGetProductsByCategory } from '../features/catApi';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { url } from '../features/api';

function Navbar() {

  const history = useNavigate()
  const dispatch = useDispatch()
  const { cartProductQuantity } = useSelector(state => state.cart)
  const [user, setUser] = useState({})
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchComment = async () => {
      try {

        const res = await axios.get(`${url}/users/find/${auth._id}`);

        setUser(res.data)

      } catch (err) {
        console.log(err);
      }
    };

    fetchComment();
  }, [auth._id]);
  console.log(user)
  const handleauth = () => {

    dispatch(logoutUser(null));
    dispatch(clearCart())
    history('/')

  }

  const products = useSelector(selectProduct)
  return (
    <>


      <div className='Header'>
        <div className="Header__left"><Link to="/" style={{ textDecoration: 'none', color: "white", fontSize: "20px" }}><h2>Online Shop Product</h2></Link></div>
        <div className="Header__center">


        </div>


        <div className="Header__right" >

          <Link to="/cart"><FaShoppingBag size={37} color="white" style={{ marginLeft: "30px" }}></FaShoppingBag>


          </Link>  {cartProductQuantity > 0 && <span className='badge' id='lblCartCount'>{cartProductQuantity}</span>}


        </div>
        <div >
          {auth._id ? (
            <Links >
              {auth?.isAdmin &&
                <div>

                  <Link style={{ color: "white", textDecoration: "none", marginRight: "3px" }} to="/admin">Admin</Link>
                </div>
              }

              <div
                onClick={
                  handleauth
                }
              >
                Logout
              </div>
              <Link style={{ color: "white", textDecoration: "none", backgroundColor: "none", marginLeft: "3px" }} to={`/profile/${user._id}`}>Profile</Link>
            </Links>
          ) : (
            <AuthLinks >
              <Link style={{ color: "white", textDecoration: "none", backgroundColor: "none" }} to="/login">Login</Link>
              <Link style={{ color: "white", textDecoration: "none" }} to="/register">Register</Link>
            </AuthLinks>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar;
const AuthLinks = styled.div`
      a {
    &:last-child {
        margin - left: 2rem;
    }
  }
      `;

const Links = styled.div`
      color: white;
      display: flex;

      div {
        cursor: pointer;

      &:last-child {
        margin - left: 2rem;
    }
  }
      `;

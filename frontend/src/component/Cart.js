import React, { useEffect } from 'react'
import Navbar from './Navbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { logoutUser, registerUser } from "../features/authSlice"
import {useDispatch, useSelector} from "react-redux"
import {removefromcart,clearCart,addCart,deceaseQuantity, getTotal} from "../features/CartSlice"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useNavigate
} from "react-router-dom";
import { detailp } from "../features/productDetailsSlice";
import { FaTrashAlt } from "react-icons/fa";
import {selectUser} from '../features/userSlice'
import Paybutton from './Paybutton';

function Cart() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user=useSelector(selectUser)
  const handleproductdetail=(product)=>{
    dispatch(detailp(product));
   
  };
  const dispatch=useDispatch()
  const Clearcart=(item)=>{
    dispatch(removefromcart(item));
  }
  const dispatch1=useDispatch()
  const clearCartt=()=>{
  dispatch1(clearCart());
  }
  const handleplus=(item)=>{
    dispatch1(addCart(item));
    }
  const handledec=(item)=>{
    dispatch(deceaseQuantity(item))
  }
  const cart=useSelector((state) => state.cart)
  useEffect(() => {
    dispatch(getTotal())
   }, [cart,dispatch])
   
   
  return (
    <div className="container">
    {cart.cartItems.length===0? (<div style={{display: 'grid',placeItems:"center",marginTop:"60px"}}>
      
      <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/empty-cart-2685174-2232751.png"></img>
      <h3 style={{marginTop:"20px"}}>Your cart Is Empty</h3>
      <Link to="/" style={{textDecoration:"none",marginTop:"20px"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
      <ArrowBackIcon color="black"/><h5 style={{marginLeft:"10px"}}>Retourner</h5>

      </div>
      </Link>
      
      </div>) :
      
      
      (
        
      <div>
  
          <div className="row my-5">
        
   <div  className="col-9">
  
    <table className="table">
      <thead>
        <tr>
        
          <th  scope="col">Product</th>
          <th  scope="col">Quantite</th>
          <th  scope="col">Price</th>
          <th  scope="col">Total</th>
         
          <th  scope="col">Action</th>
          <th  scope="col bold">Total</th>
        </tr>
      </thead>
      <tbody>
      {cart.cartItems?.map(item=>(
        <tr key={item._id}>

          <td style={{width: '40%'}}><img src={item.image.url} className='image-fluid w-25'/></td>
          
          <td id="tdd"><button
                      className="btn btn-outline-warning"
                     onClick={()=>handledec(item)}
                    >
                      -
                    </button>
                    <span className="btn btn-light qty">{item.cartQuantity}</span>
                    <button
                      className="btn btn-outline-warning"
                    onClick={()=>handleplus(item)}
                    >
                      +
                    </button></td>
          <td id="tdd">{item.price}</td>
          <td id="tdd">{item.cartQuantity}</td>
          <td id="tdd"><button className='btn btn-danger ' onClick={()=>Clearcart(item)}><FaTrashAlt  color="white"  size={20}/></button></td>
          <td id="tdd">{item.price*item.cartQuantity}</td>
         
</tr>
))}  
      </tbody>
    </table>
    <button className="btn btn-outline-danger btn-lg" onClick={()=> clearCartt()}>Clear Cart</button>
  
   
   </div>
   <div className="col-3 ">
  <div className="d-flex  flex-column justify-content-center text-center">
    <h3 >SubTotal</h3>
    <span>{cart.cartAmoutTotal}Dh</span>
  
  {auth._id ? (
               <Paybutton cartItems={cart.cartItems}/>
              ) : (
                <button
                  className="btn btn-warning "
                  onClick={() => navigate("/login")}
                >
                  Login to Check out
                </button>
              )}
    </div>
  </div>
   </div>
        
        </div>
        )}
       
       
        </div>
   
   
    
  )

}
export default Cart
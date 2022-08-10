import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart } from '../features/CartSlice';
import { detailp } from '../features/productDetailsSlice';

function Filterproducts({indipro}) {
    const dispatch=useDispatch()
    const add=()=>{
        dispatch(addCart(indipro));
    }
  return (

   <div className=" col-md-4  mb-3 " >
       
       <Link style={{textDecoration: 'none',listStyle:"none"}} to={`/ProductDetail/${indipro._id}`} className='  '> <div class="" onClick={()=>{dispatch(detailp(indipro))}} >
        <div className="product-grid">
            <div class="product-image">
                <a href="#" class="image">
                    <img className="pic-1" src={indipro.image.url}/>
                    <img className="pic-2" src={indipro.image.url}/>
                    
                </a>
               
               
            </div>
            <div class="product-content text-center">
                <h3  style={{fontSize:"20px",color:"black"}} class="title">{indipro.name}</h3>
                <div className="price" style={{fontSize:"20px",color:"black"}}>{indipro.price}DH</div>
            </div>
            <div className="card-body text-center">
                <Link style={{textDecoration: 'none'}} to="/Cart" className='card-body  '><button  style={{backgroundColor:"black",width:"220px"}} className="btn text-white" onClick={()=>add(indipro)}>Add To Cart</button></Link>
                </div>
        </div>
        </div>
        </Link>
        
    </div>
   
  )
}

export default Filterproducts
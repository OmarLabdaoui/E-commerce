import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {addCart} from "../features/CartSlice"
import { useGetAllProductsQuery } from "../features/productsApi";
import Navbar from "./Navbar";
import { FaHeart,FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
  Link,
  Redirect
} from "react-router-dom";
import { detailp, selectDetail } from "../features/productDetailsSlice";

import {displaycat, selectProduct} from "../features/productsSlice"

import { db } from "./firebase";
import { selectauth } from "../features/authSlice";
import Filterproducts from "./Filterproducts";
import Search from "./Search";

function Homme(){
  const [rech,setRech]=useState("")
 //const {data, error, isLoading } = useGetAllProductsQuery();
  const { items: data, status } = useSelector((state) => state.products);
  const auth =useSelector(selectauth)
 
  const [produits,setProduits]=useState(data)
 console.log(produits)
  const cate=data.map(product=>(product.cat))
  
  
const dispatch = useDispatch()

const handleaddtocart=(product)=>{
  
  dispatch(addCart(product));
 
};
const filterResult=(catItem)=>{
  let categories=[]
  categories=data.filter((curDate)=>{
      return curDate.cat=== catItem;
  });
  return categories
   }                               
const filterItems=(category)=>{
 
  let categories=[]
  
  categories=data.filter(item=>category===item.cat );
   return categories
   
   };
   const [spans]=useState([
    {id:"all",text:"All Products"},
     {id:"creatineMono",text:"Creatine"},
     {id:"wheyproteine",text:"Whey Protein"},
     {id:"preworkout",text:"Pre Workout"}
   ])
   const [active,setActive]=useState("")
   const [categorie,setCategorie]=useState([])
const handlecat=(indispan)=>{
   setActive(indispan.id)
   setCategorie(indispan.text)
   filterbycat(indispan.text)
}

const [filterproduits,setFilter]=useState([])
const filterbycat=(text)=>{
  if(text==="All Products"){
    setFilter(data)
    return;
  }
  const filter=data.filter((item)=>item.cat===text)
  setFilter(filter)
}
  return (
    
   
   
    <div> 
     
       <div className="container" >
 
       <div  className="cherche">
         <Search data={data}/>
       
    </div>
       <div className="row my-5">
         <div className="row">
       <div className="col mt-4">
           {spans.map(indispan=>(
             <div key={indispan.id}>
            <button onClick={()=>handlecat(indispan)} className="btn" >{indispan.text}</button>

</div>
           ))}
       
</div>
<div className="col-10">
  {filterproduits.length>0 && (
    <div className="row">
  <h1 style={{display:"grid",placeItems:"center"}}>{categorie}</h1>
  {filterproduits.map(indipro=>(
 <Filterproducts key={indipro.id} indipro={indipro} handleaddtocart={handleaddtocart}/>
  ))}
 
  </div>
  )}
  
</div>
</div>   
       
       
       
{filterproduits.length<1 && (


<>
       {data.filter((val)=>{
        if(rech===""){
           return val
         } else if(val.name.toLowerCase().includes(rech?.toLowerCase())){
           return val
                           
        }
      }).map(product =>
       
       <div key={product._id} className="  col-md-3 col-sm-2 mb-3 " >
       
       <Link style={{textDecoration: 'none',listStyle:"none"}} to={`/ProductDetail/${product._id}`} className='  '> <div class="" onClick={()=>{dispatch(detailp(product))}} >
        <div className="product-grid">
            <div class="product-image">
                <a href="#" class="image">
                    <img className="pic-1" src={product.image.url}/>
                    <img className="pic-2" src={product.image.url}/>
                    
                </a>
               
               
            </div>
            <div class="product-content text-center">
                <h3  style={{fontSize:"20px",color:"black"}} class="title">{product.name}</h3>
                <div className="price" style={{fontSize:"20px",color:"black"}}>{product.price}DH</div>
            </div>
            <div className="card-body text-center">
                <Link style={{textDecoration: 'none'}} to="/Cart" className='card-body  '><button  style={{backgroundColor:"black",width:"220px"}} className="btn text-white" onClick={()=>handleaddtocart(product)}>Add To Cart</button></Link>
                </div>
        </div>
        </div>
        </Link>
        
    </div>
  
  )}
  </>
      )}
      
       </div>
       
       </div>
    
    
    
    </div>
  );
};

export default Homme;

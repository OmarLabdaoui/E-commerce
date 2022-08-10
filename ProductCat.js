import React from 'react'
import { useDispatch } from 'react-redux'
import {displaycat} from "../features/productsSlice"
function ProductCat({data}) {
 const dispatch=useDispatch()
  const filterr=()=>{
   dispatch(displaycat())
  }
  return (
    <div className="container">
    
    </div>
  )
}

export default ProductCat
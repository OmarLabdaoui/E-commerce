import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailp } from '../features/productDetailsSlice';

function Search({data}) {
    const dispatch=useDispatch()
    const [filterData,setFilterData]=useState([])
   const handleFilter= (event)=>{
        const searchWord=event.target.value;
        const newFilter= data.filter((value)=>{
        return value.name.toLowerCase().includes(searchWord.toLowerCase())
   });
   if(searchWord===""){
       setFilterData([])
   }else{
    setFilterData(newFilter)
   }
   
   }
  return (
    <div className='search'>
        <div  className='searchInputs'>
            <input type="search" placeholder='Recherche' onChange={handleFilter}/>
        </div>
        {filterData.length >0 && 
        
        <div className="dataResult">
  {filterData.map((value,key)=>{
   return <Link style={{textDecoration: 'none',listStyle:"none",borderBottom:"0.5px solid gray "}} to={`/ProductDetail/${value._id}`} className='dataItem ' onClick={()=>{dispatch(detailp(value))}}><img src={value.image.url} style={{height:"40px"}}/><p>{value.name}</p></Link>;
  })}
</div>
}
    </div>
  )
}

export default Search
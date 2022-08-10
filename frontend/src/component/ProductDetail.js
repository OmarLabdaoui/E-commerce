import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllProductsQuery } from '../features/productsApi';

import { getTotal, addCart, adddetailcart, ajouter } from "../features/CartSlice"
import { addCartt, addcomment, deceaseQuantity, detailp, productsCreateComment, selectDetail, test } from "../features/productDetailsSlice"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "reakit/Button";
import { useCheckboxState, Checkbox } from "reakit/Checkbox";

import { selectauth } from '../features/authSlice';
import { url } from '../features/api';
import axios from 'axios';
import { productsCommentCreate } from '../features/productsSlice';

function ProductDetail(props) {
  const [comment, setComment] = useState("")


  const [open, setOpen] = useState(false)
  const checkbox = useCheckboxState({ state: [] });
  const cart = useSelector((state) => state.cart)
  const auth = useSelector(selectauth)

  const dispatch = useDispatch()
  const { cartProductQuantity } = useSelector(state => state.cart)
  const handleplus = (producrdetails) => {
    dispatch(addCart(producrdetails));


  }
  const handlepluss = () => {
    dispatch(adddetailcart());

  }

  const detail = useSelector(state => state.producrdetails.productsFetchdetail)
  // console.log(detail.gout.map(gout=>gout))
  const [commentdescription, setCommentDescription] = useState('')
  const [item, setItem] = useState([])
  const params = useParams();


  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(false);
  //function to create comment
  useEffect(() => {
    const fetchComment = async () => {
      try {

        const res = await axios.get(`${url}/products/cherche/${params.id}`);

        setItem(res.data)

      } catch (err) {
        console.log(err);
      }
    };

    fetchComment();
  }, [params.id]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/products/find/${params.id}`);

        setProduct(res.data);
        setComments(res.data.comments)
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [params.id]);



  const handleComment = async (e) => {
    e.preventDefault()
    const newComment = {
      comment: commentdescription,
      authorname: auth.name,


    };

    try {
      const res = await axios.post(`${url}/products/comment/${params.id}`, newComment);
      setItem(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      productsCommentCreate(

        {

          commentdescription: commentdescription
        }
      )
    );
  };

  const { data, error, isLoading } = useGetAllProductsQuery(detail._id);
  const add = () => {
    product.commments.comments += commentdescription
  }

  console.log(comments)
  console.log(item)
  return (

    <div className="container">



      <div key={product._id} className="row my-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="col-md-6 ">



              <div className="mt-5">
                <img className="w-75" src={product.image?.url} alt="" />
              </div>

            </div>
            <div className="col-md-6 ">
              <h2>{product.name}</h2>

              <p> Référence : {product._id}</p>
              <p>{product.infos}</p>







              <h2>{product.price}DH</h2>


              <div >




                <Link style={{ textDecoration: 'none' }} to="/Cart"  ><button className="btn btn-warning mt-3 " onClick={() => handleplus(product)}>Ajouter Au Panier</button></Link>

              </div>
            </div>
          </>
        )}


      </div>
      <div className="row my-5">
        <button className='btn btn-primary w-25 mb-3' onClick={() => open ? setOpen(false) : setOpen(true)}>Ajouter Une commentaire</button>
        {open &&
          <div className="mb-3">
            <form onSubmit={handleComment} style={{ display: "flex" }}>
              <input type="text" value={commentdescription} onChange={(e) => setCommentDescription(e.target.value)} className='form-control w-25' placeholder='Add Comment...' />
              <button className='btn btn-primary' type='submit'>Add comment</button>
            </form>


          </div>

        }

        <hr />
        {item.comments?.map((pub) => (
          <div style={{ marginBottom: "3px" }}>
            <div style={{ display: "flex" }}>
              <AccountCircleIcon style={{ marginRight: "2px" }} />
              <p>{pub.authorname}</p>
            </div>

            <h5 style={{ marginLeft: "5px" }}> {pub.comment}</h5>
          </div>
        ))}
      </div>




    </div >
  )
}

export default ProductDetail
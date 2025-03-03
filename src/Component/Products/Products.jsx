/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import styles from './Products.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCard } from '../Store/Card';
import { data } from '../../Data';


const { product, productImg ,ProductsAll ,nameproducss , MassageMaxValue } = styles;
export default function Products() {
  let dispatch = useDispatch()
  let allData = useSelector((state)=> state.Card.items)
  let [massageMaxNumber , setMassageMax ] = useState('')
  let params = useParams()
  let [getProducts , setProducts] = useState([])
  let [getError , setError] = useState('')




  function addcard(ele){
    if(allData.length > 0){
      let x = allData.find((eleo)=> eleo.id == ele.id )
      if(x){
           if(x.numbers < 3  && x.mix > x.numbers)    {
            dispatch(addToCard(ele))
           }else{
    
            setMassageMax('You have exceeded the limit.')
            setTimeout(() => {
              setMassageMax('')
            }, 2000);
           }
     }else{
      dispatch(addToCard(ele))
     }
      }else{
        dispatch(addToCard(ele))
      }
  }



 async function getMen() {
  try{

       let x = await axios.get(`http://localhost:5005/products?cat_prefix=${params.prefix}`)
       setProducts(x.data)
  }
 catch(error){
      setError('Not Found Data')
 }
}
useEffect(()=>{
  getMen()
  setProducts([data.products.find((el) => el.cat_prefix == params.prefix)])
} ,[])


  return (
    <>
   
     <div className={`container row justify-content-center ${ProductsAll} `}>
      <h2 className={nameproducss}>{ params.prefix} Products</h2>
      {massageMaxNumber ?  <div className="alert alert-danger" role="alert">
 {massageMaxNumber}
</div>  : ''}
         {getProducts ? getProducts.map((ele)=> <div className={`col-2  mb-5 mt-5  ${product}`  } key={ele.id}>
         <Link to={`/Product/${ele.id}`} >
           <div className={productImg}  >
              <img src={`${ele.img}`} alt="Product" />
           </div>
           <h2 title={`${ele.title}`}>{ele.title}</h2>
           <h3>{ele.price.toFixed(2)} EGP</h3>
    </Link>
    <p className={MassageMaxValue}>available  : {ele.max}</p>
     <p className={MassageMaxValue}>Maximum value 3</p>
           <button onClick={()=>addcard(ele)}  >
               Add to cart
           </button>
         
           </div>) :
          getError ? 
            <div className="alert alert-danger" role="alert">
              {getError}
            </div>
          : <div className='vh-100 d-flex align-items-center justify-content-center'>
            <li className='fa fa-spinner fa-spin  fa-3x'></li>
        </div> } 
    </div>

    
    </>
  )
}

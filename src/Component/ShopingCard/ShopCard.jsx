/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import styles from "./ShopCard.module.css";
import Totalprice from './Totalprice';
import { useDispatch, useSelector } from 'react-redux';
import { removeToCard, updateToNumbers } from '../Store/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';


const { cartItem, product, productImg, productInfo, cartItemSelection , QuantitySHop , formcard  , logocard ,errorMassage} =
  styles;
export default function ShopCard() {
  let disPatch = useDispatch()
  let arrayMaxNum = [1 , 2 , 3]
  let detalisProducrt = useSelector((state)=>state.Card.items)
  let [notFoundData , setMassage] = useState('')
  let [allData , setData] = useState([])

  useEffect(()=>{ 
    if(detalisProducrt.length == 0){
          setMassage('not found products in the shopping cart.')

    }else{

      setData(detalisProducrt)
    }

  },[detalisProducrt])

  function removeProduct(id){
     let x =detalisProducrt.filter((ele)=> ele.id != id )
     disPatch(removeToCard(id))
     setData(x)
  }
  function updateNumbersProduct(detalis){
    disPatch(updateToNumbers(detalis))
  }
  return (
    <>
      <div className={`${logocard} container`}>
        <h2>Card</h2>
      </div>
     {allData.length > 0 ? allData.map((ele)=> <div key={ele.id} className={`${cartItem} container`}>
            <div className={product}>
              <Link to={`/Product/${ele.id}`}>
        <div className={productImg}>
          <img
            src={ele.img}
            alt={ele.title}
          />
        </div>
        </Link>
        <div className={productInfo}>
          <h2>{ele.title}</h2>
          <h3>{ele.price} EGP</h3>
          <button className="mt-auto" onClick={()=>removeProduct(ele.id) } >
            Remove
          </button>
        </div>
      </div>
            <div className={cartItemSelection}>
        <span className={`${QuantitySHop} `}>Quantity</span>
        <form className={formcard} >
          <select  onChange={(el)=>updateNumbersProduct({value: el.target.value , ids: ele.id} )}>
             <option  >{ele.numbers}</option> 

          {arrayMaxNum.filter((num) => num !== ele.numbers) .map((num) => (
          <option key={num} value={num}>{num}</option> 
            ))}
        
          </select>
         
 
        </form>
      </div>  
          </div>
          
       )   : <div className={errorMassage}>{notFoundData} </div>}
 
    <div className='container'>
        <Totalprice /> 
    </div>

   
    </>
  )
}

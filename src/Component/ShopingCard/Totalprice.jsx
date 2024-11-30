/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import styles from "./ShopCard.module.css";
import { useSelector } from 'react-redux';
export default function Totalprice() {
  let [priceall , setpriceall] = useState(null)
 let detalisProducrt = useSelector((state)=>state.Card.items)
 
 useEffect(()=>{
  if(detalisProducrt.length > 0){
    let allprice = detalisProducrt.reduce((total , item)=> total + item.price * item.numbers  , 0)
    setpriceall(allprice)
  }else{
    setpriceall(0)
  }
 },[detalisProducrt])
  return (
    <>
    <div className={styles.containertotal}>
      <span >Subtotal:</span>
      <span>{priceall} EGP</span>
    </div>
    
    </>
  )
}

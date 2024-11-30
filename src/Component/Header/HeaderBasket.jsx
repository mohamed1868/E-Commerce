/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import style from './HeaderBasket.module.css'
import Logo from '../../assets/svg/Card.svg?react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


let {basketContainer , basketQuantity , pumpCartQuantity}  =style

export default function HeaderBasket() {
 let [we, wew] = useState(0); 
 let [anmation , setanmetion] = useState(false)
let allBasketnum = useSelector((state) => state.Card.items);

 let addclass =  `${basketQuantity} ${anmation ? pumpCartQuantity : ''}`
 
if(allBasketnum.length == 0){
   addclass = `${basketQuantity}`
}

useEffect(() => {
  
  if (allBasketnum.length > 0) {

    const totalNumbers = allBasketnum.reduce((acc, current) => acc + current.numbers, 0);
    wew(totalNumbers);
  } else {
    wew(0);
  }

    setanmetion(true)
    let timeout = setTimeout(()=>{
      setanmetion(false)
    } , 300)

  return ()=> clearTimeout(timeout)

}, [allBasketnum]); 

  
  return (<>
   <Link to={'/ShopCard'}>
       <div className={basketContainer}>
    <Logo title="basket icon"  />
    <div className={addclass}>{we}</div>
  </div>  
   </Link>

  </>

  )
}

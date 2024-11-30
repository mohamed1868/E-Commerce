
/* eslint-disable no-unused-vars */

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import style from './Product.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addToCard } from '../Store/Card'

let {detelseproduct , MassageMaxValue } = style
export default function Product() {
  let dispatch = useDispatch()
  let allData = useSelector((state)=> state.Card.items)
  let [massageMaxNumber , setMassageMax ] = useState('')
 let pramase = useParams()
 let [detelse , setdetelsr] = useState([])
 let [erroe , seterror] = useState('Not Found Product')

 async function getProduct() {
  try{

       let x = await axios.get(`http://localhost:5005/products?id=${pramase.id}`)
       setdetelsr(x.data)
   
  }
 catch(error){
  seterror('Not Found Data')
 }
}
  

function addcard(ele){
 if(allData.length > 0){
  let x = allData.find((eleo)=> eleo.id == ele.id )

  if(x){
       if(x.numbers < 3 && x.mix > x.numbers )    {
      
        dispatch(addToCard(ele))
       }else{

        setMassageMax('You have exceeded the limit.')
        setTimeout(() => {
          setMassageMax('')
        }, 3000);
       }
 }else{
  dispatch(addToCard(ele))
 }
  }else{
    dispatch(addToCard(ele))
  }
  
}


useEffect(()=>{
  
} ,[allData])
useEffect(()=>{
  getProduct()

} ,[])

  return (
    <>

   <div className='container '>
        {massageMaxNumber ?  <div className="alert alert-danger" role="alert">
 {massageMaxNumber}
</div>  : ''}
    { detelse.length > 0
    ?  detelse.map((el)=> <div key={el.id} className={`${detelseproduct} row`}>
       <div className='col-5'>
        <img src={`${el.img}`} className='w-75' ></img>
       </div>
       <div className='col-7'>
             <h1>Name : {el.title}</h1>
             <h3>Price : {el.price.toFixed(2)} EG</h3>
             <h4>Category : {el.cat_prefix}</h4>
             <h5>available : {el.max}</h5>
             <p className={MassageMaxValue}>Maximum value 3</p>
             <button onClick={()=>addcard(el) }  >Add Product</button>
       </div>
    
    </div>

    ) : erroe
    ?   <div className="alert alert-danger" role="alert">
    {erroe}
  </div>
    :<div className='vh-100 d-flex align-items-center justify-content-center'>
    <li className='fa fa-spinner fa-spin  fa-3x'></li>
</div> }
   </div>
    
    </>
  )
}

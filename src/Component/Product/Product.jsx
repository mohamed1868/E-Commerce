
/* eslint-disable no-unused-vars */

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom'
import style from './Product.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addToCard, addToCardFromProduct } from '../Store/Card'

let {detelseproduct , MassageMaxValue , ContainerAddNums } = style
export default function Product() {
  let dispatch = useDispatch()
  let allData = useSelector((state)=> state.Card.items)
   let pramase = useParams()
  let [massageMaxNumber , setMassageMax ] = useState('')
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
       if( ele.data.max >= ele.numbers){
      
        dispatch(addToCardFromProduct(ele))
       }else{

        setMassageMax('You have exceeded the limit.')
        setTimeout(() => {
          setMassageMax('')
        }, 3000);
       }
 
  
}
function Provide(){
    let button = document.querySelector('.numProduct')
  let currentNumber  = parseInt(button.textContent) 
  if(currentNumber < 3 ){
     button.textContent =  currentNumber + 1 
  }

 
}
function Reduce(){
  let button = document.querySelector('.numProduct')
  let currentNumber  = parseInt(button.textContent) 
  if(currentNumber > 1){
      button.textContent -= 1 
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
       <div className='col-7 '>
             <h1>Name : {el.title}</h1>
             <h3>Price : {el.price.toFixed(2)} EG</h3>
             <h4>Category : {el.cat_prefix}</h4>
             <h5>available : {el.max}</h5>
             <p className={MassageMaxValue}>Maximum value 3</p>

             <button onClick={()=>addcard({data : el , numbers: parseInt( document.querySelector('.numProduct').textContent) }) }  >Add Product</button>
                      <div className={`${ContainerAddNums} btn-group`} role="group" aria-label="Basic outlined example">
              <button onClick={()=>Reduce()} type="button" className="btn btn-outline-primary">-</button>
                <button type="button " className="btn btn-outline-primary numProduct">1</button>
              <button onClick={()=>Provide()} type="button" className="btn btn-outline-primary">+</button>
             </div>
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

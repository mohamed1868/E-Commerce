/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import styles from "./Category..module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';


const { category, categoryImg, categoryTitle ,CategoryAll ,textCategory} = styles;
export default function Category() {
  
   let [getcategorys , setcategorys] = useState([])
   let [getError , setError] = useState('')

  async function getCategory() {
   try{

        let x = await axios.get('http://localhost:5005/categories')
        setcategorys(x.data)
   }
  catch(error){
       setError('Not Found Data')
  }
         


  }
  useEffect(()=>{
    getCategory()
  } ,[])


  return (
    <>

    <div className={`container row justify-content-center ${CategoryAll} `}>
      <h1 className={textCategory}>Category</h1>
      {getcategorys ?
         getcategorys.map( (el)=>
          
          <div key={el.id} className={`${category} col-3 mb-5 mt-5  ` }>
            <Link to={`/Products/${el.prefix}`} >
             <div className={categoryImg}>
                 <img src={`${el.img}`}  alt=""/>
              </div>
              <h4 className={categoryTitle}>{el.title}</h4>
              </Link> 
          </div>
           )
      : getError ? 
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

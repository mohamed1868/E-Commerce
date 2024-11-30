// eslint-disable-next-line no-unused-vars
import React from 'react'
import HeaderBasket from './HeaderBasket'





export default function Header2(prop) {
  return (
    <> 
    
    <div className='containerheader2 container '>
      <div className='row'>
      <div className='containerlogo col-11'>
        <h1 className='logo' ><span className='firestlogo'>Our</span> <span className="badge text-bg-danger ">E-commerce</span> </h1>
      </div>

           <div className='col-1'>
        {prop.data ? <HeaderBasket />  : ""}
         
      </div> 
      </div>

    </div>
    
    </>
  )
}

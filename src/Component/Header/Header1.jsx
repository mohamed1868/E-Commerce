
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './HeaderCss.css'
import { Link } from 'react-router-dom'




export default function Header1(prop) {

  let ul = document.querySelectorAll('li a')
  function Addactive(){

     ul.forEach((ele) => {
      ele.onclick = function(){
        ul.forEach((el)=>el.classList.remove('activeHeader'))
        ele.classList.add('activeHeader')
      }
       
     });
  }


  useEffect(()=>{
    Addactive()
  },[ul])

  
   function darksun(){
    let sun =  document.getElementById('sun')
    let moon = document.getElementById('moon')
     sun.style.visibility = 'hidden'
     moon.style.visibility = 'visible'
    document.body.classList.add('dark')
    window.localStorage.dark = 'dark'
  }
  
  function darkmoon(){
    let sun =  document.getElementById('sun')
    let moon = document.getElementById('moon')
     sun.style.visibility = 'visible'
     moon.style.visibility = 'hidden'
     document.body.classList.remove('dark')
     window.localStorage.removeItem('dark')
  }

  useEffect(()=>{
     if(window.localStorage.dark){
        darksun()
        
     }
  
  },[])

 
  return (<>
  <nav className="navbar navbar-expand-lg bg-body-tertiary header container header1">
  <div className="container-fluid">
    <button className="navbar-toggler iconcoler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <Link to={'Home'} className="nav-link activeHeader" aria-current="page" >Home</Link>
        </li>
  
        <li className="nav-item">
          <Link to={'Category'} className="nav-link " aria-current="page" >Category</Link>
        </li>

      </ul>
      <ul className="navbar-nav   mb-2 mb-lg-0">
      <div className='darkmodeicone '>
        <i id='sun' className="fa-regular fa-sun" onClick={()=>darksun()}></i>
        <i id='moon' className="fa-regular fa-moon "  onClick={()=>darkmoon()}></i>        
    </div>
    {prop.data? 
         <li className="nav-item">
         <span className='nav-link Logout0' aria-current="page" onClick={()=> prop.logouu()}>Logout</span>
       </li>
        :        <li className="nav-item">
          <Link to={'Login'} className="nav-link active" aria-current="page"  >Login</Link>
        </li>}

        <li className="nav-item">
          <Link to={'Register'} className="nav-link active" aria-current="page" >Register</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
 
  </>
   
  )
}

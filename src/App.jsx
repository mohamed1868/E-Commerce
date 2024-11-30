
import { Route, Routes, useNavigate } from 'react-router-dom'
import Header1 from './Component/Header/Header1'
import Header2 from './Component/Header/Header2'
import Footer from './Component/Footer/Footer'
import Register from './Component/Login/Register/Register'
import Login from './Component/Login/Register/Login'
import Home from './Component/Home/Home'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Error from './Component/Error page/Error'
import Product from './Component/Product/Product'
import Products from './Component/Products/Products'
import Category from './Component/Category/Category'

import ShopCard from './Component/ShopingCard/ShopCard'
import Username from './Component/Username/Username'



function App() {
  let [userdata , getuserdata] = useState(null)
  let navigate = useNavigate()


  function locals(){
      let x = localStorage.userToken
     let ex = jwtDecode(x)
     getuserdata(ex)
 
  }

useEffect(()=>{
  if(localStorage.getItem('userToken')){
    locals()
  }
} ,[])

function logoute(){

getuserdata(null)
localStorage.removeItem('userToken')
navigate('/Home')

}




  return (
    <>
    <Header2 data={userdata} />
    <Header1  logouu={()=>logoute()}  data={userdata} />
     <Username data={userdata}/> 
    <Routes    >
        <Route path='/' element={<Home />}></Route>
        <Route path='Register'  element={   <Register />} ></Route>
        <Route path='Login' element={<Login lox={()=>locals()} />}></Route>     
        <Route path='Home' element={<Home />}></Route>
        <Route path='Category' element={<Category />}></Route>
        <Route path='Product' element ={<Product />}  >
     <Route path=':id'  element={<Product  />}   />
        </Route>
        <Route path='Products' element={<Products />} >
     <Route path=':prefix' element ={<Products />} />
        </Route>
        <Route path='ShopCard' element={<ShopCard />}></Route>
        <Route path='*' element={<Error />}></Route>
    </Routes>

    <Footer />
    </>
  )
}

export default App

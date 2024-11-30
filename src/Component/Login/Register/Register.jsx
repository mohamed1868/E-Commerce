/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */


// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Joi from 'joi'
import axios from 'axios'
import stylee from './Log.module.css'
export default function Register() {
    let navigate = useNavigate()
    let [error ,seterror] = useState('')
    let [joiget , setjoi] =useState([])
    let [loding , setloding] =useState(false)
    let [Data , setdata] = useState({
        userName : '' ,
        dateOfBirth: '' ,
        email : '' ,
        Password : '',
        rePassword : '',
    })
    function updatedate(ele){
      let x = {...Data}
      x[ele.target.name] = ele.target.value
      setdata(x)
    }
    async function submit(ele){
        ele.preventDefault()
        let x = style();
        setloding(true)
    if (x.error) {
        setjoi(x.error.details);
        setloding(false)
        
    } else {
        try{
         await axios.post('http://hawas.runasp.net/api/v1/Register' , Data)
         navigate("/Login")
         setloding(false)
        }catch(error){
            setloding(false)
          seterror('This data is reserved for others')
        }
        }

    }

    function style(){
        let reg = Joi.object({
          userName: Joi.string().alphanum().min(3).max(20).required(),
          dateOfBirth:Joi.string().min(3).max(2000).required() ,
          email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) ,
          Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
          rePassword:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) 
    
        })
    
        return reg.validate(Data , {abortEarly: false})
      }
    
  



  return (
    <> 
    <div className='container'>
 {error ?<div className="alert alert-danger" role="alert">{error}</div> : ''}
 
   { joiget.map((ele)=> <div className="alert alert-danger" role="alert">{ele.message}</div>)}
    <form className={stylee.register} onSubmit={submit}>
  <div className="mb-3">
    <label htmlFor="userName" className="form-label">userName:</label>
    <input onChange={updatedate} name='userName' type="text" className="form-control" id="userName" aria-describedby="emailHelp"/>
    
  </div>
    <div className="mb-3">
    <label htmlFor="dateOfBirth" className="form-label">dateOfBirth:</label>
    <input  onChange={updatedate} name='dateOfBirth' type="date" className="form-control" id="dateOfBirth" aria-describedby="emailHelp"/>
    
  </div>
   <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
    <input  onChange={updatedate} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label">Password:</label>
    <input  onChange={updatedate} name='Password' type="password" className="form-control" id="Password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="rePassword" className="form-label">rePassword:</label>
    <input  onChange={updatedate} name='rePassword' type="password" className="form-control" id="rePassword"/>
  </div>


  <button type="submit" className={`btn btn-primary ${stylee.submit}` }>{loding?<li className='fa fa-spinner fa-spin'/>: "Register"} </button>
</form>

    </div>
   
    </>
  )
}

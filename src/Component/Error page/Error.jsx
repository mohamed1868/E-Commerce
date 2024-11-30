// eslint-disable-next-line no-unused-vars
import React from 'react'
import style from './Error.module.css'

let {texterror , box} = style
export default function Error() {
  return (<>
  
  <div className={`container ${box}`}>
  <i className="fa-solid fa-bomb"></i>
    <h1 className={texterror}>on the page : Error 404</h1>
   

  </div>
  
  </>
    
  )
}

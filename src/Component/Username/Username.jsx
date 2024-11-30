// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import style from "./Username.module.css"
import { jwtDecode } from 'jwt-decode';

let {usernamestyle} = style

export default function Username(prop) {
    const [username, setUsername] = useState(null);

    function loadUsername() {
  
      const token = localStorage.getItem("userToken");
      if (token) {
        const decodedToken = jwtDecode(token)
        const userName = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  
        setUsername(userName);
      } else {    
        setUsername('')
      }
    }
  
   
    useEffect(() => {

      loadUsername();

    }, [prop.data]); 
  
  
    return (<>
          <div className={`${usernamestyle} container` }>
        
         {username ? <h1> <span>Welcome</span>  {username}</h1> : ""} 
      </div>
    </>

    );
  };


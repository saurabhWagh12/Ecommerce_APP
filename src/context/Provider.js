import React, { useState } from "react";
import UserContext from "./UserContext";

function Provider({children}) {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [backendURL,setBackendURL]= useState("");
    const [total,setTotal] = useState(0);
  return (
    <UserContext.Provider value={{isLoggedIn,setIsLoggedIn,backendURL,setBackendURL,total,setTotal}}>
        {children}
    </UserContext.Provider>
  )
}

export default Provider


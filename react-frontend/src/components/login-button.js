import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    // const {loginWithRedirect} = useAuth0();

    const loginToWordpress = (username,password) => {
        
    }

    return (
        // <button onClick={()=> loginWithRedirect() }>Login</button>
        <button onClick={()=>console.log("LOGGIN IN")}>Login</button>
    )
};

export {LoginButton}
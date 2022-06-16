import React, { useEffect, useState } from "react";
import { nodeBaseUrl, validatePath } from "../../config";
import { Profile } from "./profile";
import { AuthLink } from "./auth-link";
import { NavLink } from "react-router-dom";

export const AuthHeader = ({isAuthenticated,setIsAuthenticated}) => {
    const [userDisplayName,setUserDisplayName] = useState('');

    const validateToken = (token) => {
        console.log("Validating token")
        console.log(token);
        fetch(`${nodeBaseUrl}${validatePath}?JWT=${token}`)
        .then((res)=>{
            return res
        })
    }
    const refreshToken = (token,username,password) => {
        console.log("Refreshing Token")
    }
    useEffect(()=>{
        console.log("CHecking for exisintg credentials");
        if(
            localStorage.getItem('radioWesternWordpressAccessToken') &&
            localStorage.getItem('radioWesternWordpressUserLogin') &&
            localStorage.getItem('radioWesternWordpressUserPass')
            ){
                console.log(
                    "exisiting RW WP credentials found",
                    localStorage.getItem('radioWesternWordpressAccessToken'),
                    localStorage.getItem('radioWesternWordpressUserLogin'),
                    localStorage.getItem('radioWesternWordpressUserPass')
                )
                // validateToken(localStorage.getItem('radioWesternWordpressAccessToken'))                                       
                // .then((res)=>{
                //     refreshToken(res)
                // })
        }

    },[])

    // return (
    //     <div>
    //         <Profile  
    //             isAuthenticated={isAuthenticated}
    //             userDisplayName = {userDisplayName}
    //         /> 
    //         <AuthLink 
    //             isAuthenticated={isAuthenticated} 
    //             setIsAuthenticated = {setIsAuthenticated}
    //             setUserDisplayName = {setUserDisplayName}
    //         />
    //     </div>
    // )

    return (
        <div>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/auth">{isAuthenticated ? 'Logout' : 'Login'}</NavLink>
        </div>
    )
}